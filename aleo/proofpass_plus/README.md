# ProofPass+ Leo Program (Wave 1)

This folder contains the **initial Leo program skeleton** for ProofPass+.

## Goals (Wave 1)
- Create a **private credential record** (no plaintext credential data on-chain)
- Support a **purpose-bound**, **time-limited**, **one-time** proof flow via:
  - public `Proof` descriptor (purpose hash, expiry, nullifier)
  - on-chain **nullifier spend** (replay protection)

## Files
- `program.json`: program metadata
- `src/main.leo`: structs (`Credential`, `Proof`) + placeholder transitions

## Next steps
- Implement nullifier derivation (hash/PRF)
- Implement expiry enforcement (likely using block height surrogate)
- Implement `spent_nullifiers` checks + updates in `verify_proof`

