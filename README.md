![EnergyID Logo](energyid-logo.svg)

# Energy DID Generation Service

A NestJS-based microservice for generating and managing Decentralized Identifiers (DIDs) on the Energy Web Chain. This service enables the creation of DIDs for batteries and users, along with credential issuance and management capabilities using zero-knowledge proof technology.

## Overview

This service provides a RESTful API for:
- Creating Energy DIDs for batteries and users
- Issuing and managing verifiable credentials
- Revoking credentials when needed
- Storing DID data and credentials in MongoDB

The service leverages an identity SDK to create DIDs on the Energy Web Chain (Volta testnet) and supports zero-knowledge proof-based credential verification.

## Features

- ✅ **Energy DID Creation**: Generate DIDs specifically for the Energy Web Chain
- ✅ **Dual Identity Types**: Support for both Battery and User identities
- ✅ **Credential Management**: Issue, retrieve, and revoke verifiable credentials
- ✅ **MongoDB Storage**: Persistent storage of DID data and credentials
- ✅ **Basic Authentication**: Secure API endpoints with HTTP Basic Auth
- ✅ **External Issuer Integration**: Integration with external issuer node for user identities
- ✅ **Zero-Knowledge Proofs**: Support for ZK proofs via zero-knowledge proof circuits

## Technology Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **DID SDK**: Identity and credential management SDK
- **Blockchain**: Energy Web Chain (Volta testnet)
- **Authentication**: Passport HTTP Basic Strategy

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local instance or connection string)
- npm or yarn package manager
- Access to Energy Web Chain Volta testnet RPC endpoint

## Installation

1. Clone the repository:
```bash
git clone https://github.com/impactility/energy-did-generation
cd energy-did-generation
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.sample .env
```

4. Edit `.env` file with your configuration (see [Configuration](#configuration) section)

5. **Important**: Configure the identity SDK for Energy Web Chain:
   
   Add the following to `node_modules/@iden3/js-iden3-core/dist/node/cjs/constants.js`:
   ```javascript
   exports.DidMethod.Energy = 0b00000100;
   exports[`${exports.Blockchain.EnergyWeb}:${exports.NetworkId.Volta}`] = 64 | 2;
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=6000

# Reverse Hash Service (RHS) URL for credential revocation
RHS_URL="https://rhs-staging.polygonid.me"

# Energy Web Chain Configuration
CONTRACT_ADDRESS="0xfFB6F669c85Add1cd87072828579bF56DD3a2110"
RPC_URL="https://volta-rpc.energyweb.org"
CHAIN_ID="73799"

# Wallet Configuration
WALLET_KEY="<your-wallet-private-key-in-hex>"

# MongoDB Configuration
MONGO_DB_CONNECTION="mongodb://127.0.0.1:27017/adi-db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8"

# Circuit Files Path
CIRCUITS_PATH="./circuits"

# Basic Authentication
BASIC_AUTH_USER=<your-username>
BASIC_AUTH_PASS=<your-password>

# External Issuer Node Configuration (for user identities)
ISSUER_NODE_URL=http://localhost:3001
ISSUER_API_AUTH_USER=<issuer-username>
ISSUER_API_AUTH_PASSWORD=<issuer-password>
```

### Circuit Files

The service requires zero-knowledge proof circuit files. These should be placed in the `circuits/` directory. The circuit files include:
- `authV2/` - Authentication circuit
- `credentialAtomicQueryMTPV2/` - Merkle Tree Proof circuit
- `credentialAtomicQuerySigV2/` - Signature proof circuit
- And other required circuits

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
# Build the application
npm run build

# Run the production build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## API Endpoints

All endpoints require HTTP Basic Authentication.

### Create Energy DID (Battery)

Creates a new Energy DID for a battery device.

**Endpoint**: `POST /energy`

**Headers**:
```
Authorization: Basic <base64(username:password)>
Content-Type: application/json
```

**Request Body**:
```json
{
  "issuedFor": "Battery",
  "cobaltPUniqueId": "unique-battery-id-123"
}
```

**Response**:
```json
{
  "did": "did:energy:volta:...",
  "id": "...",
  "state": {...}
}
```

### Create Identity

Creates a new identity (for users or batteries).

**Endpoint**: `POST /v2/identities`

**Headers**:
```
Authorization: Basic <base64(username:password)>
Content-Type: application/json
```

**Request Body**:
```json
{
  "issuedFor": "User",  // or "Battery"
  "cobaltPUniqueId": "unique-id-123"
}
```

**Response**: Identity object with DID information

### Create Credential

Issues a verifiable credential for an identity.

**Endpoint**: `POST /v2/identities/:identifier/credentials`

**Headers**:
```
Authorization: Basic <base64(username:password)>
Content-Type: application/json
```

**Request Body**:
```json
{
  "credentialSchema": "https://example.com/schema.json",
  "credentialSubject": {
    "id": "did:energy:volta:...",
    "property1": "value1",
    "property2": "value2"
  },
  "mtProof": true,
  "signatureProof": true,
  "type": "EnergyCredential"
}
```

**Response**: Created credential object

### Get Credentials

Retrieves all credentials for an identity.

**Endpoint**: `GET /v2/identities/:identifier/credentials`

**Headers**:
```
Authorization: Basic <base64(username:password)>
```

**Response**: Array of credential objects

### Get Specific Credential

Retrieves a specific credential by ID.

**Endpoint**: `GET /v2/identities/:identifier/credentials/:id`

**Headers**:
```
Authorization: Basic <base64(username:password)>
```

**Response**: Credential object

### Revoke Credential

Revokes a credential by nonce.

**Endpoint**: `POST /v2/identities/:identifier/credentials/revoke/:nonce`

**Headers**:
```
Authorization: Basic <base64(username:password)>
```

**Response**: Revocation confirmation

## Project Structure

```
energy-did-generation/
├── src/
│   ├── auth/                 # Authentication module (Basic Auth)
│   ├── database/             # Database configuration
│   ├── energy/               # Energy DID service and controller
│   │   ├── energy.service.ts
│   │   ├── energy.controller.ts
│   │   ├── identity.ts       # DID creation logic
│   │   ├── walletSetup.ts    # Wallet and storage initialization
│   │   └── energyIdData.schema.ts  # MongoDB schema
│   ├── identities/           # Identity management service
│   │   ├── identities.service.ts
│   │   ├── identities.controller.ts
│   │   └── dto/              # Data Transfer Objects
│   ├── app.module.ts         # Root module
│   └── main.ts               # Application entry point
├── circuits/                 # Zero-knowledge proof circuit files
├── dist/                     # Compiled JavaScript files
├── test/                     # E2E tests
└── package.json
```

## Data Models

### EnergyIdData Schema

Stored in MongoDB:
- `did`: The generated DID string
- `credential`: JSON stringified credential
- `privateInfo`: Object containing seed phrase, secret key, and public key
- `requestIp`: IP address of the request
- `issuedFor`: Either "User" or "Battery"
- `cobaltPUniqueId`: Unique identifier for the entity
- `created_at`: Timestamp of creation

## Testing

Run unit tests:
```bash
npm run test
```

Run e2e tests:
```bash
npm run test:e2e
```

Run tests with coverage:
```bash
npm run test:cov
```

## Development

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## How It Works

1. **DID Creation for Batteries**:
   - Generates a seed phrase using `near-seed-phrase`
   - Extracts 32 bytes from the seed phrase for DID creation
   - Uses the identity SDK to create an Energy DID on Volta testnet
   - Stores the DID, credential, and private information in MongoDB

2. **DID Creation for Users**:
   - Forwards the request to an external issuer node
   - The issuer node creates the DID with Energy Web Chain configuration
   - Returns the created identity

3. **Credential Management**:
   - Credentials are issued through the external issuer node
   - Supports both Merkle Tree Proofs (MTP) and Signature Proofs
   - Credentials can be retrieved and revoked as needed

## Security Considerations

- All API endpoints are protected with HTTP Basic Authentication
- Private keys and seed phrases are stored securely in MongoDB
- The service uses the Energy Web Chain Volta testnet (not mainnet)
- Ensure proper access control to the MongoDB database
- Keep wallet private keys secure and never commit them to version control

## Troubleshooting

### Common Issues

1. **Circuit files not found**: Ensure circuit files are downloaded and placed in the `circuits/` directory
2. **MongoDB connection errors**: Verify MongoDB is running and the connection string is correct
3. **RPC connection errors**: Check that the Energy Web Chain RPC URL is accessible
4. **DID creation fails**: Verify wallet has sufficient balance and the contract address is correct

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
Copyright (c) 2025 Impactility

## Support

For issues and questions, please contact the development team.

## Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Uses identity and credential management SDK [iden3](https://iden3.io/)
- Deployed on [Energy Web Chain](https://www.energyweb.org/)
