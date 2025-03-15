import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import player from 'play-sound';
import * as path from 'path';
import * as fs from 'fs';

// 音声プレーヤーの初期化
const audioPlayer = player();
const SYSTEM_SOUND_PATH = '/System/Library/Sounds/Glass.aiff'; // macOSのデフォルトサウンド
// MCPサーバーの作成
const server = new McpServer({
  name: "Sound Notification MCP",
  version: "1.0.0",
  description: "エージェントがコーディングを終了したときに通知音を鳴らすMCP"
});

// 音声を再生するツールの実装
server.tool(
  "play-completion-sound",
  { soundType: z.enum(["default", "success", "error"]).optional() },
  async ({ soundType = "default" }) => {
    try {
      
      // 音声ファイルが存在するか確認
      if (fs.existsSync(SYSTEM_SOUND_PATH)) {
        console.log('音声ファイルが見つかりました: ', SYSTEM_SOUND_PATH);
        // 音声を再生
        audioPlayer.play(SYSTEM_SOUND_PATH, (err: any) => {
          if (err) {
            console.error('音声再生エラー:', err);
          }
        });
        return {
          content: [{ type: "text", text: `通知音を再生しました: ${soundType}` }]
        };
      } else {
        console.error('音声ファイルが見つかりません: ', SYSTEM_SOUND_PATH);
        return {
          content: [{ type: "text", text: `音声ファイルが見つかりません: ${SYSTEM_SOUND_PATH}` }]
        };
      }
    } catch (error) {
      console.error('エラー:', error);
      return {
        content: [{ type: "text", text: `エラーが発生しました: ${error}` }]
      };
    }
  }
);

// サーバー起動時のメッセージ
console.log("Sound Notification MCP サーバーを起動しています...");

// stdioトランスポートを使用してサーバーを起動
const transport = new StdioServerTransport();
server.connect(transport).catch(err => {
  console.error("MCPサーバーエラー:", err);
  process.exit(1);
});
