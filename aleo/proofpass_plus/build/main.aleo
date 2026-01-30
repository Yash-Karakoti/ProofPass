program proofpass_plus.aleo;

struct Credential:
    payload_commitment as field;
    issuer_commitment as field;
    schema_commitment as field;

record CredentialRecord:
    owner as address.private;
    credential as Credential.private;
    secret as field.private;

struct Proof:
    credential_id as field;
    purpose_hash as field;
    expires_at as u32;
    one_time as boolean;
    nullifier as field;

record ProofRecord:
    owner as address.private;
    proof as Proof.private;
    used as boolean.private;

function create_credential:
    input r0 as field.private;
    input r1 as field.private;
    input r2 as field.private;
    input r3 as field.private;
    cast r0 r1 r2 into r4 as Credential;
    add r0 r1 into r5;
    add r5 r2 into r6;
    cast self.caller r4 r3 into r7 as CredentialRecord.record;
    output r7 as CredentialRecord.record;
    output r6 as field.private;

function generate_proof:
    input r0 as CredentialRecord.record;
    input r1 as field.private;
    input r2 as u32.private;
    input r3 as boolean.private;
    input r4 as field.private;
    add r0.credential.payload_commitment r0.credential.issuer_commitment into r5;
    add r5 r0.credential.schema_commitment into r6;
    cast r6 r1 r2 r3 0field into r7 as Proof;
    cast self.caller r7 false into r8 as ProofRecord.record;
    output r8 as ProofRecord.record;
    output r7 as Proof.private;

function verify_proof:
    input r0 as CredentialRecord.record;
    input r1 as ProofRecord.record;
    input r2 as Proof.private;
    input r3 as u32.private;
    input r4 as field.private;
    is.eq r0.owner self.caller into r5;
    is.eq r1.owner self.caller into r6;
    is.eq r1.proof.nullifier r2.nullifier into r7;
    is.eq r1.proof.purpose_hash r2.purpose_hash into r8;
    and r7 r8 into r9;
    is.eq r1.proof.expires_at r2.expires_at into r10;
    and r9 r10 into r11;
    is.eq r1.proof.credential_id r2.credential_id into r12;
    and r11 r12 into r13;
    is.eq r1.proof.one_time r2.one_time into r14;
    and r13 r14 into r15;
    lte r3 r2.expires_at into r16;
    not r1.used into r17;
    add r0.credential.payload_commitment r0.credential.issuer_commitment into r18;
    add r18 r0.credential.schema_commitment into r19;
    is.eq r19 r2.credential_id into r20;
    add r0.secret r2.credential_id into r21;
    add r21 r2.purpose_hash into r22;
    cast r2.expires_at into r23 as field;
    add r22 r23 into r24;
    add r24 r4 into r25;
    is.eq r25 r2.nullifier into r26;
    and r5 r6 into r27;
    and r27 r15 into r28;
    and r28 r16 into r29;
    and r29 r17 into r30;
    and r30 r20 into r31;
    and r31 r26 into r32;
    cast r1.owner r1.proof true into r33 as ProofRecord.record;
    ternary r32 r33.proof.credential_id r1.proof.credential_id into r34;
    ternary r32 r33.proof.purpose_hash r1.proof.purpose_hash into r35;
    ternary r32 r33.proof.expires_at r1.proof.expires_at into r36;
    ternary r32 r33.proof.one_time r1.proof.one_time into r37;
    ternary r32 r33.proof.nullifier r1.proof.nullifier into r38;
    cast r34 r35 r36 r37 r38 into r39 as Proof;
    ternary r32 r33.owner r1.owner into r40;
    ternary r32 r33.used r1.used into r41;
    cast r40 r39 r41 into r42 as ProofRecord.record;
    ternary r32 true false into r43;
    output r42 as ProofRecord.record;
    output r43 as boolean.private;
