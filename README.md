# Sound Notification MCP （JPN followed By ENG）

このプロジェクトは、WindsurfやCursorなどのAIコーディングアシスタントがユーザーの注意が必要な場合に通知音を鳴らすMCPサーバーです。コーディングの終了時やユーザーの承認が必要なときに通知音を鳴らすことができます。

## 注意事項&免責
- ※設定を追加する際は必ずセットでrulesに記載を追加してください。
- 現状MACにのみ対応しています。作成者がmacを使っていてWindows検証できないため
- MCPのCALLはLLMの判断に任せることになるため、予想外のタイミングで音が鳴ったり想定通りに動作しない可能性があります。
- Cursorのコマンド実行前の承認は鳴らないこともあります。
- Windsurfだと通知音を複数回鳴らしてしまう現象があります。

## セットアップ

### 前提条件

- Node.js (v18以上)
- Yarn

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd sound-notification-mcp

# 依存関係のインストール
yarn install

# ビルド
yarn build
```

これで準備完了です。

### WindsurfやCursorでの設定

#### Cursor
サンプルを/.cursor/mcp.jsonに記載しました。
（/.cursor/mcp.jsonに書くとプロジェクト毎に記載が必要になります。Globalで有効にしたければ設定アイコンから設定してください。）

#### Windsurf
```mcp_config.json```に設定を記載します。
/.cursor/mcp.jsonと全く同じ内容で問題ありません。

## カスタマイズ

### 通知音の変更

`src/index.ts`ファイル内の以下の部分を変更します：

```typescript
const SYSTEM_SOUND_PATH = '/System/Library/Sounds/Glass.aiff'; // macOSのデフォルトサウンド

```

macOSで利用可能なシステムサウンドは `/System/Library/Sounds/` ディレクトリにあります：
- Bottle.aiff
- Frog.aiff
- Funk.aiff
- Glass.aiff
- Hero.aiff
- Morse.aiff
- Ping.aiff
- Pop.aiff
- Purr.aiff
- Sosumi.aiff
- Submarine.aiff
- Tink.aiff

## トラブルシューティング

### 音が鳴らない場合

1. システム音量が適切に設定されているか確認してください。
2. 指定した音声ファイルが存在するか確認してください。
3. ターミナルの出力でエラーメッセージを確認してください。

### MCPサーバーが起動しない場合

1. Node.jsとYarnが正しくインストールされているか確認してください。
2. 依存関係が正しくインストールされているか確認してください：
   ```bash
   yarn install
   ```
3. ビルドエラーがないか確認してください：
   ```bash
   yarn build
   ```

## ライセンス

MIT

---

# English Version

This project is an MCP server that plays notification sounds when AI coding assistants like Windsurf or Cursor require user attention. It can play notification sounds when coding is complete or when user approval is needed.

## Notes & Disclaimer
- ※ When adding settings, please always add corresponding entries to the rules.
- Currently only supports MAC as the creator uses a Mac and cannot verify on Windows.
- Since MCP CALLS depend on LLM judgment, sounds may play at unexpected times or not work as expected.
- For Cursor, sounds may sometimes not play before command execution approval.
- With Windsurf, there is a phenomenon where notification sounds may play multiple times.

## Setup

### Prerequisites

- Node.js (v18 or higher)
- Yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sound-notification-mcp

# Install dependencies
yarn install

# Build
yarn build
```

Now you're ready to go.

### Configuration for Windsurf and Cursor

#### Cursor
A sample configuration is provided in ```/.cursor/mcp.json```
(Writing to /.cursor/mcp.json requires configuration for each project. If you want to enable it globally, please configure it from the settings icon.)

#### Windsurf
Add configuration to ```mcp_config.json```.
The content can be exactly the same as ```/.cursor/mcp.json```.

For Windsurf, it is also strongly recommended to:
1. Add the notification instructions to your ```global_rules.md``` file
2. Add the notification settings to your memories

This ensures that the AI assistant consistently uses sound notifications when needed.

## Customization

### Changing the Notification Sound

Modify the following section in the `src/index.ts` file:

```typescript
const SYSTEM_SOUND_PATH = '/System/Library/Sounds/Glass.aiff'; // macOS default sound
```

System sounds available on macOS can be found in the `/System/Library/Sounds/` directory:
- Bottle.aiff
- Frog.aiff
- Funk.aiff
- Glass.aiff
- Hero.aiff
- Morse.aiff
- Ping.aiff
- Pop.aiff
- Purr.aiff
- Sosumi.aiff
- Submarine.aiff
- Tink.aiff

## Troubleshooting

### If No Sound Plays

1. Check that the system volume is properly set.
2. Verify that the specified sound file exists.
3. Check the terminal output for error messages.

### If the MCP Server Fails to Start

1. Verify that Node.js and Yarn are correctly installed.
2. Check that dependencies are properly installed:
   ```bash
   yarn install
   ```
3. Check for build errors:
   ```bash
   yarn build
   ```

## License

MIT
