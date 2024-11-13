# Tonstakers Demo

## Installation

```bash
yarn
```

## Local Development

To run the app locally, you need to have [https://ngrok.com/](https://ngrok.com/) installed.

Then, copy files:

```bash
cp .env.local.example .env.local
cp public/tonconnect-manifest.example.json public/tonconnect-manifest.json
```

Start ngrok:

```bash
yarn ngrok
```

And put `public url` from `ngrok`  to `.env.local` and `public/tonconnect-manifest.json` files


## Development

```bash
yarn dev
```

## Production

```bash
yarn build
```
