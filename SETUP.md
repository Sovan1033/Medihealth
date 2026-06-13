# MediHealth EHR — Setup Guide

Blockchain-powered Electronic Health Records built with **Angular 17**, **Web3.js**, **IPFS**, and **Solidity**.

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | ≥ 18 | Runtime |
| npm | ≥ 9 | Package manager |
| Angular CLI | 17 | `npm i -g @angular/cli@17` |
| Truffle | 5.x | `npm i -g truffle` |
| Ganache | Latest | Local blockchain |
| IPFS Desktop / CLI | Latest | Decentralised storage |
| MetaMask | Browser extension | Wallet |

---

## 1 · Clone & Install

```bash
cd medihealth-ehr
npm install
```

---

## 2 · Start Local Blockchain (Ganache)

Open **Ganache** and create a new workspace on port **7545**.

Copy the **first account private key** — this will be your **Admin** wallet.

Import it into MetaMask (Settings → Import Account).

---

## 3 · Compile & Deploy Smart Contracts

```bash
truffle compile
truffle migrate --reset --network development
```

This creates `build/contracts/Contract.json` which the Angular app reads automatically.

---

## 4 · Start IPFS Node

```bash
# Install IPFS CLI
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT","POST","GET"]'
ipfs daemon
```

IPFS API will run on `http://localhost:5001`.
IPFS Gateway will run on `http://localhost:8080`.

---

## 5 · Start the Angular App

```bash
ng serve
```

Open **http://localhost:4200**

---

## 6 · First-Time Setup Flow

### As Admin
1. Open the app — MetaMask will prompt to connect.
2. Click **Admin Portal** → You're automatically verified as admin (deployer account).
3. Go to **Doctors** tab → **Add Doctor** → fill in the form.
   - The Doctor ID must be a MetaMask wallet address.
4. Go to **Patients** tab → **Register Patient** → fill in the form.
   - The Patient ID must be a MetaMask wallet address.

### As Doctor
1. Switch MetaMask to a **doctor wallet** (one you registered above).
2. Click **Doctor Portal** → Verified automatically.
3. Go to **Consultation** → Enter a patient address → Fill diagnosis, medications, tests.
4. Click **Save Consultation** → MetaMask will prompt for transaction confirmation.

### As Patient
1. Switch MetaMask to a **patient wallet** (one registered by admin).
2. Click **Patient Portal** → Verified automatically.
3. View your **Records** and **Profile**.

---

## Access Control (On-Chain)

| Role | Verification | Capabilities |
|------|-------------|--------------|
| **Admin** | `isAdmin()` → contract deployer | Register doctors & patients, view stats |
| **Doctor** | `isDr(address)` → added by admin | Consult patients, write records, view any record |
| **Patient** | `isPat(address)` → registered by admin | View own records and profile |

---

## Project Structure

```
medihealth-ehr/
├── contracts/          ← Solidity smart contracts
│   ├── Contract.sol    ← Main EHR contract (Admin/Doctor/Patient roles)
│   ├── Roles.sol       ← OpenZeppelin-style role library
│   └── Migrations.sol
├── migrations/         ← Truffle deployment scripts
├── build/contracts/    ← Auto-generated after `truffle compile`
├── src/
│   ├── app/
│   │   ├── admin/      ← Admin module (dashboard, doctors, patients)
│   │   ├── doctor/     ← Doctor module (dashboard, consult, records)
│   │   ├── patient/    ← Patient module (dashboard, records, profile)
│   │   ├── shared/     ← Home, Navigation, NotFound
│   │   └── services/   ← Blockchain, IPFS, Auth services
│   ├── environments/   ← IPFS endpoint config
│   ├── styles.scss     ← Global design system (CSS variables, utilities)
│   └── index.html
├── truffle-config.js
├── angular.json
└── SETUP.md
```

---

## Tech Stack

- **Frontend**: Angular 17, SCSS, Font Awesome 6
- **Blockchain**: Solidity 0.8.19, Web3.js 4.x, Truffle 5.x
- **Storage**: IPFS HTTP Client
- **Wallet**: MetaMask
- **Design**: Custom design system — Sora + DM Sans fonts, navy/teal palette

---

## Troubleshooting

**MetaMask not detected** → Install the MetaMask browser extension and reload.

**"Access denied"** → Make sure you've switched to the correct wallet (admin/doctor/patient).

**Contract not found** → Run `truffle migrate --reset` and refresh the page.

**IPFS errors** → Make sure `ipfs daemon` is running and CORS headers are set correctly.

**Transaction stuck** → In MetaMask → Settings → Advanced → Reset Account.
