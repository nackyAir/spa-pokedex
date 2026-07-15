# SPA Pokédex

Demo: https://spa-pokedex.nh-nakki0509.workers.dev

SPA（Single Page Application）は、最初に読み込んだ1枚のHTML上でJavaScriptが画面を切り替えるWebアプリです。このPokédexでは、一覧と詳細を移動してもページ全体を再読み込みせず、URLと表示内容だけが更新されます。

## 実行方法

```bash
pnpm install
pnpm dev
pnpm test
```

## 学習ポイント

- コードベースのルート定義と画面遷移: `src/routes.tsx:18-45`、`src/pages/PokemonList.tsx:50-75`
- URL検索パラメータの検証とページング: `src/routes.tsx:22-34`、`src/pages/PokemonList.tsx:14-17,77-95`
- API取得処理とQuery Options: `src/lib/pokeapi.ts:11-42`
- 5分間のQueryキャッシュ: `src/main.tsx:9-16`
- ネットワーク不要の単体テスト: `src/lib/format.test.ts:1-17`
