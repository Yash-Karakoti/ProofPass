// ProofPass+ (Wave 1) — Leo program skeleton
// Privacy-first: no credential plaintext should ever be public.

// NOTE:
// - This file intentionally does NOT implement full logic yet.
// - Transitions below are placeholders to establish program structure.

program proofpass_plus.aleo {

// -----------------------------
// Core data types (requested)
// -----------------------------

// Credential data is represented by commitments/hashes, not plaintext.
// In Wave 1, we keep this minimal: a commitment to off-chain credential data.
struct Credential {
    // Commitment/hash of the credential payload (e.g., Poseidon/BHP hash).
    payload_commitment: field,
    // Optional commitment to an issuer identity/attestation.
    issuer_commitment: field,
    // Optional schema/version identifier (commitment or small public id encoded as field).
    schema_commitment: field,
}

// A purpose-bound, time-limited, one-time "proof descriptor".
// In practice, the proof is the transaction itself; this struct describes the public values
// we will bind into ZK constraints and nullifier spending.
struct Proof {
    // Reference to the underlying credential (derived from commitments; not plaintext).
    credential_id: field,
    // Hash of the purpose string (canonicalized off-chain).
    purpose_hash: field,
    // Expiry expressed as a chain-available surrogate (e.g., block height).
    expires_at: u32,
    // Indicates this proof should only be accepted once.
    one_time: bool,
    // Nullifier to enforce one-time use (spent on-chain).
    nullifier: field,
}

// -----------------------------
// Private record types
// -----------------------------

// A private record the user holds. The record proves ownership and enables ZK statements.
record CredentialRecord {
    owner: address,
    credential: Credential,
    // Secret material used to derive nullifiers in ZK.
    // TODO: Replace with a more specific secret scheme (PRF key / salt) in Wave 1 logic.
    secret: field,
}

// A private record that stores "proof usage state" encrypted to its owner.
// Privacy note:
// - `used` is private state (encrypted in the record), not a public on-chain flag.
// - This is useful for UX / protocol flows where the verifier requires the prover to
//   present (and potentially consume/update) a proof record during verification.
// - Replay protection for adversarial third parties is typically enforced publicly via
//   spent nullifiers (see `spent_nullifiers` mapping), which we will implement next.
record ProofRecord {
    owner: address,
    proof: Proof,
    used: bool,
}

// -----------------------------
// Core transitions (placeholders)
// -----------------------------

// 1) Creating a private credential
//
// Inputs:
// - payload_commitment: commitment to credential data stored off-chain (private by construction)
// - issuer_commitment: optional issuer commitment
// - schema_commitment: optional schema commitment
// - secret: user secret (private)
//
// Outputs:
// - (CredentialRecord, field): private record owned by caller + credential identifier
transition create_credential(
    payload_commitment: field,
    issuer_commitment: field,
    schema_commitment: field,
    secret: field
) -> (CredentialRecord, field) {
    // TODO: add issuer attestation checks / schema constraints (Wave 2+)
    let credential: Credential = Credential {
        payload_commitment,
        issuer_commitment,
        schema_commitment,
    };

    // Privacy note:
    // - We do NOT write credential plaintext to any public mapping/state.
    // - Returning a `record` is Aleo's "encrypted state" model: the record contents are
    //   encrypted to `owner` and only the owner can later spend/use it as private witness.
    // - The only public artifact is the record commitment (UTXO-style), which does not
    //   reveal the payload/issuer/schema commitments or secret.

    // Credential identifier:
    // - Deterministically derived from commitments + owner.
    // - This is safe to expose publicly because it is computed from commitments (not plaintext)
    //   and does not enable credential data recovery.
    // TODO: Replace with the preferred hash primitive for Aleo/Leo once we finalize it.
    let credential_id: field = payload_commitment + issuer_commitment + schema_commitment;

    // Leo reserves the keyword `record`, so we use a more explicit name here.
    let credential_record: CredentialRecord = CredentialRecord {
        owner: self.caller,
        credential,
        secret,
    };

    return (credential_record, credential_id);
}

// 2) Generating a proof descriptor (purpose-bound, expiring, one-time)
//
// Note: Proof generation is typically "off-chain" (the proof is the ZK transaction).
// This transition exists as a structural placeholder for how we derive public proof inputs.
//
// Inputs:
// - cred: user's private credential record
// - purpose_hash: hash of purpose
// - expires_at: expiry height/time surrogate
// - session_nonce: optional session nonce from verifier/backend (prevents copy between sessions)
//
// Outputs:
// - Proof: contains the public values that will be verified/spent
transition generate_proof(
    cred: CredentialRecord,
    purpose_hash: field,
    expires_at: u32,
    one_time: bool,
    session_nonce: field
) -> (ProofRecord, Proof) {
    // Zero-knowledge / privacy guarantees:
    // - The credential's underlying data is never revealed: we only work with commitments.
    // - The returned `Proof` contains a credential reference (`credential_id`) that is
    //   derived from commitments (not plaintext), so verifiers can reference it without
    //   learning the credential contents.
    // - The proving witness remains private: the credential record + secret are not public
    //   inputs; they can later be used as private witness in `verify_proof`.

    // Credential reference:
    // TODO: Replace with a proper hash of (owner, payload_commitment, issuer_commitment, schema_commitment).
    // This placeholder keeps structure clear without final cryptographic choices.
    let credential_id: field =
        cred.credential.payload_commitment + cred.credential.issuer_commitment + cred.credential.schema_commitment;

    // One-time nullifier:
    // TODO: derive nullifier = H(cred.secret, credential_id, purpose_hash, expires_at, one_time, session_nonce)
    // The nullifier is the anti-replay handle that can be "spent" during verification.
    let nullifier: field = 0field;

    let proof: Proof = Proof {
        credential_id,
        purpose_hash,
        expires_at,
        one_time,
        nullifier,
    };

    // Store proof usage state privately in an encrypted record.
    // A verifier flow can require the prover to present this record and (optionally)
    // return an updated one with `used = true` as part of verification.
    let proof_record: ProofRecord = ProofRecord {
        owner: self.caller,
        proof,
        used: false,
    };

    return (proof_record, proof);
}

// 3) Verifying a proof without revealing credential data + enforcing one-time use
//
// Inputs:
// - cred: user's private credential record (witness)
// - proof: public proof descriptor (purpose, expiry, nullifier)
// - session_nonce: binds proof to a session (optional)
//
// Output:
// - accepted: boolean-like result (true if accepted). In practice you can rely on revert/accept.
transition verify_proof(
    cred: CredentialRecord,
    proof_record: ProofRecord,
    proof: Proof,
    current_height: u32,
    session_nonce: field
) -> (ProofRecord, bool) {
    // Zero-knowledge / privacy guarantees:
    // - No private credential data is revealed: verification uses commitments + a secret witness.
    // - The verifier (and chain observers) only see the public `Proof` descriptor and the fact
    //   that this transition accepted/rejected; they do not see the credential payload.
    //
    // Replay attack prevention:
    // - We mark `proof.nullifier` as spent in a public mapping when (and only when) a one-time
    //   proof is successfully verified. Re-submitting the same proof will fail because the
    //   nullifier is already spent.
    // - Additionally, the prover's private `ProofRecord.used` flag is updated to `true` on
    //   success, which helps the prover avoid accidental re-use in their own wallet/app UI.

    // Ownership checks (keep records associated with the creator/prover).
    let caller_owns_cred: bool = cred.owner == self.caller;
    let caller_owns_proof_record: bool = proof_record.owner == self.caller;

    // Check that the provided proof matches the stored private proof record (no substitution).
    let record_matches_proof: bool =
        proof_record.proof.nullifier == proof.nullifier
        && proof_record.proof.purpose_hash == proof.purpose_hash
        && proof_record.proof.expires_at == proof.expires_at
        && proof_record.proof.credential_id == proof.credential_id
        && proof_record.proof.one_time == proof.one_time;

    // Expiry check.
    // NOTE: Wave 1 uses `current_height` as a block-height surrogate provided by the caller.
    // TODO: Replace this with a chain-provided height/time value once finalized in Leo/Aleo.
    let not_expired: bool = current_height <= proof.expires_at;

    // Private usage-state check (encrypted in the proof record).
    // NOTE (Wave 1): We rely on the private `used` flag in `ProofRecord` for one-time semantics.
    // A public nullifier mapping can be added in a later wave using async mapping operations.
    let not_used_privately: bool = !proof_record.used;

    // Proof validity check:
    // - Ensure the proof references the same credential commitment set as `cred`.
    // - Ensure the nullifier is consistent with the private secret witness + public proof inputs.
    //
    // IMPORTANT: The derivations below are placeholders until we finalize the hash/PRF primitive.
    // They demonstrate the ZK wiring (private witness + public inputs) without revealing secrets.
    let computed_credential_id: field =
        cred.credential.payload_commitment + cred.credential.issuer_commitment + cred.credential.schema_commitment;
    let credential_ref_ok: bool = computed_credential_id == proof.credential_id;

    // TODO: Use a proper hash/PRF. For now we bind the nullifier to secret + proof fields.
    let expected_nullifier: field =
        cred.secret + proof.credential_id + proof.purpose_hash + (proof.expires_at as field) + session_nonce;
    let nullifier_ok: bool = expected_nullifier == proof.nullifier;

    let is_valid: bool =
        caller_owns_cred
        && caller_owns_proof_record
        && record_matches_proof
        && not_expired
        && not_used_privately
        && credential_ref_ok
        && nullifier_ok;

    if is_valid {
        let updated: ProofRecord = ProofRecord {
            owner: proof_record.owner,
            proof: proof_record.proof,
            used: true,
        };
        return (updated, true);
    }

    // Invalid: return unchanged record and `false`.
    return (proof_record, false);
}
}
