# ProofPass+

<div align="center">

**Privacy-First Credential Verification on Aleo**

*Prove eligibility, not identity.*

[![Leo](https://img.shields.io/badge/Leo-v3.4-blue)](https://leo-lang.org/)
[![Aleo](https://img.shields.io/badge/Aleo-Testnet-green)](https://www.aleo.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)

</div>

---

## 📋 Table of Contents

- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Privacy Model](#privacy-model)
- [How It Works](#how-it-works)
- [Leo Program Details](#leo-program-details)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Wave 1 Scope](#wave-1-scope)
- [Future Roadmap](#future-roadmap)

---

## Introduction

**ProofPass+** is a privacy-first Web3 credential application built for the **Aleo Privacy Buildathon**. It enables users to store credentials privately and generate **purpose-bound**, **time-limited**, **one-time** zero-knowledge proofs that verifiers can validate **without ever seeing the underlying credential data**.

Unlike traditional credential systems that require users to share sensitive information (IDs, dates of birth, addresses), ProofPass+ uses zero-knowledge cryptography to prove eligibility without revealing identity. Privacy is not optional—it's the core feature.

### Key Features

- 🔒 **Private Credential Storage**: Credentials stored as encrypted records on Aleo (no plaintext on-chain)
- 🎯 **Purpose-Bound Proofs**: Each proof is cryptographically bound to a specific purpose/verifier
- ⏰ **Time-Limited**: Proofs automatically expire after a specified time window
- 🔐 **One-Time Use**: Each proof can only be verified once, preventing replay attacks
- 🛡️ **Zero-Knowledge Verification**: Verifiers learn only "valid/invalid"—never the credential contents

---

## Problem Statement

Traditional credential systems suffer from fundamental privacy and security flaws:

### The Over-Sharing Problem

Most systems force users to:
- **Reveal entire credentials** (full name, DOB, address, ID numbers) even when only a single attribute is needed
- **Share credentials with multiple parties**, creating a trail of data exposure
- **Trust centralized providers** to store and protect sensitive data correctly

### The Trust Problem

Users must trust:
- **Issuers** to maintain secure databases
- **Verifiers** to handle credentials responsibly
- **Centralized platforms** not to leak, sell, or misuse data

### Real-World Consequences

- **Data breaches** expose millions of credentials at once
- **Identity theft** from leaked personal information
- **Surveillance** through credential correlation across services
- **Discrimination** based on revealed attributes
- **Loss of control** over personal data once shared

---

## Solution

ProofPass+ solves these problems using **zero-knowledge proofs** and **Aleo's private execution model**:

### Data Minimization by Design

- **Store credentials privately**: Credentials are encrypted records owned by users, never stored in plaintext
- **Prove, don't reveal**: Generate proofs that demonstrate possession of valid credentials without exposing the data
- **Purpose-bound**: Each proof is cryptographically tied to a specific purpose, preventing reuse across contexts
- **Time-limited**: Proofs expire automatically, reducing long-term exposure risk
- **One-time use**: Cryptographic nullifiers prevent replay attacks

### Trustless Architecture

- **No central authority**: Credentials are stored on-chain as private records (encrypted state)
- **Verifiable without trust**: Zero-knowledge proofs allow verification without trusting the prover
- **User-controlled**: Users own their credential records and decide when/how to generate proofs

### Privacy Guarantees

- **Credential contents never revealed**: Only commitments/hashes are used in proofs
- **Unlinkability**: Different proofs cannot be correlated to the same user
- **Selective disclosure**: Users control exactly what is proven (currently "possession" in Wave 1)

---

## Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Blockchain / Smart Contracts
- **Aleo** - Privacy-focused blockchain platform
- **Leo** - Programming language for Aleo smart contracts
- **Zero-Knowledge Proofs** - For private verification

### Development Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Vitest** - Testing framework

---

## Architecture

### High-Level Overview

```
┌─────────────────┐
│   Frontend      │  React App (User Interface)
│   (React)       │
└────────┬────────┘
         │
         │ Submits transactions
         │ (credential creation, proof generation, verification)
         │
┌────────▼─────────────────────────────────────┐
│         Aleo Blockchain                       │
│  ┌──────────────────────────────────────┐    │
│  │  Leo Program: proofpass_plus.aleo   │    │
│  │  ┌────────────────────────────────┐  │    │
│  │  │  Private Records (Encrypted)   │  │    │
│  │  │  - CredentialRecord             │  │    │
│  │  │  - ProofRecord                  │  │    │
│  │  └────────────────────────────────┘  │    │
│  │  ┌────────────────────────────────┐  │    │
│  │  │  Transitions                   │  │    │
│  │  │  - create_credential           │  │    │
│  │  │  - generate_proof              │  │    │
│  │  │  - verify_proof                │  │    │
│  │  └────────────────────────────────┘  │    │
│  └──────────────────────────────────────┘    │
└───────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Frontend Layer
- **Credential Management**: Create, view, and manage credentials
- **Proof Generation**: Generate purpose-bound proofs with expiry and one-time flags
- **Verification Interface**: Submit proofs for verification
- **Wallet Integration**: Connect to Aleo wallet for transaction signing

#### 2. Leo Program (`aleo/proofpass_plus`)
- **Data Structures**:
  - `Credential`: Commitment-based credential representation
  - `Proof`: Public proof descriptor (purpose, expiry, nullifier)
  - `CredentialRecord`: Private encrypted record (user-owned)
  - `ProofRecord`: Private encrypted record tracking proof usage state

- **Core Transitions**:
  - `create_credential`: Creates a private credential record
  - `generate_proof`: Produces a proof descriptor bound to purpose/expiry/one-time
  - `verify_proof`: Validates proof without revealing credential data

#### 3. Off-Chain Services (Wave 1: Minimal)
- **Session Nonce Service**: Provides fresh nonces for proof generation (optional)
- **No Credential Custody**: Backend never stores plaintext credentials

---

## Privacy Model

### What Data is Private

- ✅ **Credential Contents**: Name, ID numbers, dates, addresses, issuer details
- ✅ **User Secrets**: Cryptographic material used for proof generation
- ✅ **Proof Usage State**: Private `used` flag in `ProofRecord` (encrypted)
- ✅ **Selective Disclosure Details**: Any attribute-level information

### What Data is Revealed

- 🔓 **Proof Purpose**: Hash of purpose string (canonicalized, not human-readable)
- 🔓 **Expiry Time**: Time/height after which proof is invalid
- 🔓 **Nullifier**: Non-reversible value for one-time use enforcement
- 🔓 **Verification Result**: Valid/invalid (boolean)

### Zero-Knowledge Guarantees

ProofPass+ proves:
- ✅ User **possesses** a valid private credential
- ✅ Proof matches a **specific purpose**
- ✅ Proof is **within expiry window**
- ✅ Proof is **one-time** (not already used)

**Without revealing:**
- ❌ Credential contents
- ❌ User identity
- ❌ Any attribute values

### Why This Cannot Be Built on Public Blockchains

Traditional public blockchains (Ethereum, Solana, etc.) expose all transaction data and contract state publicly:

- **Storing credentials on-chain** would expose personal data permanently
- **Verification would leak information** if verifiers must see attributes
- **Linkability is unavoidable**—repeated interactions can be correlated
- **Selective disclosure is difficult**—forces sharing more than necessary

**Aleo's private execution model** enables:
- Private records (encrypted state)
- Zero-knowledge transaction execution
- Privacy as a first-class feature, not an afterthought

---

## How It Works

### Step 1: Create Credential

1. User provides credential data (off-chain, in frontend)
2. Frontend computes **commitments** (hashes) of credential payload, issuer, schema
3. User generates a **secret** (used for nullifier derivation)
4. Frontend calls `create_credential` transition:
   ```leo
   create_credential(payload_commitment, issuer_commitment, schema_commitment, secret)
   → (CredentialRecord, credential_id)
   ```
5. Returns a **private `CredentialRecord`** (encrypted, user-owned) and a public `credential_id`

**Privacy**: No plaintext credential data is ever stored on-chain.

### Step 2: Generate Proof

1. User selects a credential and specifies:
   - **Purpose**: What the proof is for (e.g., "KYC for Exchange X")
   - **Expiry**: When the proof should expire
   - **One-time**: Whether proof can only be used once
2. Frontend calls `generate_proof` transition:
   ```leo
   generate_proof(cred, purpose_hash, expires_at, one_time, session_nonce)
   → (ProofRecord, Proof)
   ```
3. Returns:
   - **Private `ProofRecord`**: Stores proof + `used: false` flag (encrypted)
   - **Public `Proof`**: Descriptor containing `credential_id`, `purpose_hash`, `expires_at`, `one_time`, `nullifier`

**Privacy**: Credential contents remain private; only commitments are used.

### Step 3: Verify Proof

1. Verifier requests proof verification (provides session nonce/challenge)
2. User submits `verify_proof` transition:
   ```leo
   verify_proof(cred, proof_record, proof, current_height, session_nonce)
   → (ProofRecord, bool)
   ```
3. Leo program checks:
   - ✅ Proof validity (nullifier matches expected derivation)
   - ✅ Expiry (current height ≤ expires_at)
   - ✅ Not already used (`used == false`)
   - ✅ Credential reference matches
4. If valid:
   - Returns updated `ProofRecord` with `used: true`
   - Returns `true`
5. If invalid or already used:
   - Returns original `ProofRecord` unchanged
   - Returns `false`

**Privacy**: Verifier learns only "valid/invalid"—never credential contents.

### Replay Attack Prevention

- **First verification**: `used: false` → verification succeeds → `used: true`
- **Second verification**: `used: true` → verification fails → returns `false`

---

## Leo Program Details

### Program Structure

```
aleo/proofpass_plus/
├── program.json          # Program metadata
├── README.md             # Leo program documentation
└── src/
    └── main.leo         # Main program file
```

### Data Types

#### `Credential` (Struct)
```leo
struct Credential {
    payload_commitment: field,    // Hash of credential payload
    issuer_commitment: field,      // Hash of issuer identity
    schema_commitment: field,      // Hash of schema/version
}
```

#### `Proof` (Struct)
```leo
struct Proof {
    credential_id: field,          // Reference to credential
    purpose_hash: field,           // Hash of purpose string
    expires_at: u32,               // Expiry height/timestamp
    one_time: bool,                // One-time use flag
    nullifier: field,              // Anti-replay handle
}
```

#### `CredentialRecord` (Private Record)
```leo
record CredentialRecord {
    owner: address,
    credential: Credential,
    secret: field,                 // Secret for nullifier derivation
}
```

#### `ProofRecord` (Private Record)
```leo
record ProofRecord {
    owner: address,
    proof: Proof,
    used: bool,                    // Usage state (private)
}
```

### Transitions

#### `create_credential`
- **Inputs**: `payload_commitment`, `issuer_commitment`, `schema_commitment`, `secret`
- **Outputs**: `(CredentialRecord, credential_id)`
- **Purpose**: Creates a private credential record owned by the caller

#### `generate_proof`
- **Inputs**: `cred` (CredentialRecord), `purpose_hash`, `expires_at`, `one_time`, `session_nonce`
- **Outputs**: `(ProofRecord, Proof)`
- **Purpose**: Generates a purpose-bound, time-limited, one-time proof descriptor

#### `verify_proof`
- **Inputs**: `cred` (CredentialRecord), `proof_record` (ProofRecord), `proof` (Proof), `current_height`, `session_nonce`
- **Outputs**: `(ProofRecord, bool)`
- **Purpose**: Verifies proof validity and enforces one-time use

---

## Getting Started

### Prerequisites

- **Rust** (v1.79+) - [Install Rust](https://www.rust-lang.org/tools/install)
- **Git** - [Install Git](https://git-scm.com/downloads)
- **Node.js** (v18+) - [Install Node.js](https://nodejs.org/)
- **Leo CLI** - Install via Cargo:
  ```bash
  cargo install leo-lang
  ```

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ProofPass
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Build the Leo program**:
   ```bash
   cd aleo/proofpass_plus
   leo build
   ```

### Running the Frontend

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or your configured port).

---

## Testing

### Testing the Leo Program

#### 1. Create a Credential

```bash
cd aleo/proofpass_plus
leo run create_credential 1field 2field 3field 4field
```

**Expected Output**:
- `CredentialRecord` (private record)
- `credential_id` (field)

**Screenshot Example**:
<!-- You can add screenshots like this:
![Create Credential Output](docs/screenshots/create-credential-output.png)
-->

#### 2. Generate a Proof

```bash
leo run generate_proof '<CREDENTIAL_RECORD>' 5field 100u32 true 6field
```

Replace `<CREDENTIAL_RECORD>` with the actual record from step 1.

**Expected Output**:
- `ProofRecord` (private record with `used: false`)
- `Proof` (public descriptor)

#### 3. Verify a Proof

```bash
leo run verify_proof '<CREDENTIAL_RECORD>' '<PROOF_RECORD>' '<PROOF>' 50u32 6field
```

Replace placeholders with actual values from previous steps.

**Expected Output**:
- Updated `ProofRecord` with `used: true`
- Boolean `true` (verification successful)

#### 4. Verify Again (Should Fail)

Run the same `verify_proof` command again with the updated `ProofRecord` (where `used: true`).

**Expected Output**:
- Boolean `false` (proof already used)

### Terminal Output Screenshots

You can add screenshots of terminal outputs to your README using Markdown:

```markdown
![Create Credential](docs/screenshots/create-credential.png)
![Generate Proof](docs/screenshots/generate-proof.png)
![Verify Proof](docs/screenshots/verify-proof.png)
```

**To add screenshots**:
1. Create a `docs/screenshots/` folder in your repository
2. Save terminal screenshots as PNG/JPG files
3. Reference them in the README using the syntax above

---

## Wave 1 Scope

### ✅ Implemented Features

- **Private Credential Creation**: Credentials stored as encrypted records (no plaintext on-chain)
- **Proof Generation**: Purpose-bound, time-limited, one-time proof descriptors
- **Proof Verification**: Zero-knowledge verification without revealing credential data
- **One-Time Use Enforcement**: Private `used` flag prevents proof reuse
- **Expiry Checking**: Time-based validation (using block height surrogate)

### ⚠️ Known Limitations (Wave 1)

- **Placeholder Cryptography**: `credential_id` and `nullifier` derivations use simple arithmetic (TODO: proper hash/PRF)
- **Time Surrogate**: Expiry uses caller-provided `current_height` (TODO: chain-derived time)
- **No Public Nullifier Mapping**: One-time enforcement relies on private `used` flag only (public mapping requires async functions)
- **No Issuer Registry**: Credential issuance/attestation not yet implemented
- **No Revocation**: Revoked credentials cannot be invalidated yet
- **Limited Selective Disclosure**: Currently proves "possession" only, not attribute-level constraints

### 🚧 Out of Scope (Wave 2+)

- Issuer registry and attestation system
- Credential revocation mechanism
- Attribute-level selective disclosure
- Public nullifier mapping (async mapping operations)
- Production-grade wallet integration
- Formal security audit
- Oracle integration for real-world timestamps

---

## Future Roadmap

### Wave 2: Enhanced Privacy & Functionality

- [ ] Implement proper hash/PRF for `credential_id` and `nullifier` derivation
- [ ] Add public nullifier mapping using async functions
- [ ] Implement issuer registry and attestation system
- [ ] Add credential revocation mechanism
- [ ] Chain-derived time/height for expiry validation

### Wave 3: Advanced Features

- [ ] Attribute-level selective disclosure
- [ ] Multi-credential proof composition
- [ ] Verifier policy registry
- [ ] Proof delegation/sharing mechanisms
- [ ] Mobile wallet integration

### Wave 4: Production Readiness

- [ ] Formal security audit
- [ ] Performance optimization
- [ ] Comprehensive test suite
- [ ] Documentation and developer guides
- [ ] Mainnet deployment

---

## Contributing

This project is built for the Aleo Privacy Buildathon. Contributions, suggestions, and feedback are welcome!

---

## License

MIT License - see LICENSE file for details

---

## Acknowledgments

- **Aleo** for providing the privacy-first blockchain platform
- **Leo Language** team for the excellent developer experience
- **Privacy Buildathon** organizers for the opportunity

---

<div align="center">

**Built with ❤️ for Privacy**

[Report Bug](https://github.com/your-repo/issues) · [Request Feature](https://github.com/your-repo/issues) · [Documentation](https://docs.proofpass.plus)

</div>
