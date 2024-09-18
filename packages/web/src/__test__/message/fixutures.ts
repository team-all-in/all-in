import type { Database } from '~/libs/types/database';
import type { Message } from '~/libs/types/message';

export const dummyDatabaseMessages: Database['public']['Tables']['messages']['Row'][] = [
  // Entry 1
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-15T10:30:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174000',
    message_id: '1726422356.158049',
    priority: 1,
    sentiment: '😊',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 2
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-15T14:45:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174001',
    message_id: '1726422356.158049',
    priority: 4,
    sentiment: '😱',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 3
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-16T09:15:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174002',
    message_id: '1726422356.158049',
    priority: 2,
    sentiment: '🎉',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 4
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-16T16:20:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174003',
    message_id: '1726422356.158049',
    priority: 3,
    sentiment: '🔧',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 5
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-17T11:00:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174004',
    message_id: '1726422356.158049',
    priority: 1,
    sentiment: '📈',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 6
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-17T18:30:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174005',
    message_id: '1726422356.158049',
    priority: 5,
    sentiment: '🔒',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 7
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-18T08:45:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174006',
    message_id: '1726422356.158049',
    priority: 3,
    sentiment: '💡',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 8
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-19T09:00:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174007',
    message_id: '1726422356.158049',
    priority: 2,
    sentiment: '🚀',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 9
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-20T10:00:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174008',
    message_id: '1726422356.158049',
    priority: 3,
    sentiment: '📅',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 10
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-23T11:15:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174009',
    message_id: '1726422356.158049',
    priority: 4,
    sentiment: '🐛',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 11
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-24T09:30:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174010',
    message_id: '1726422356.158049',
    priority: 2,
    sentiment: '👍',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 12
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-24T14:00:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174011',
    message_id: '1726422356.158049',
    priority: 5,
    sentiment: '🔥',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 13
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-25T10:15:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174012',
    message_id: '1726422356.158049',
    priority: 1,
    sentiment: '✨',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 14
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-25T15:45:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174013',
    message_id: '1726422356.158049',
    priority: 3,
    sentiment: '📢',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 15
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-26T09:00:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174014',
    message_id: '1726422356.158049',
    priority: 2,
    sentiment: '💭',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 16
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-26T17:30:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174015',
    message_id: '1726422356.158049',
    priority: 4,
    sentiment: '🚨',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 17
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-27T08:15:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174016',
    message_id: '1726422356.158049',
    priority: 3,
    sentiment: '📎',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 18
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-28T12:00:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174017',
    message_id: '1726422356.158049',
    priority: 1,
    sentiment: '🍀',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 19
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-29T16:45:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174018',
    message_id: '1726422356.158049',
    priority: 5,
    sentiment: '❗',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
  // Entry 20
  {
    app: 'slack',
    channel_id: 'C07MELMF3TM',
    created_at: '2024-09-30T09:00:00+09:00',
    id: '123e4567-e89b-12d3-a456-426614174019',
    message_id: '1726422356.158049',
    priority: 2,
    sentiment: '🔔',
    server_id: 'T07N3HCA1S4',
    user_id: '4c898773-8d48-4408-a6b8-d28e0eea4b69',
  },
];

export const dummyMessageResponse: Message[] = [
  // Entry 1
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'お疲れ様です！今日のミーティングの議事録をシェアしました。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543210',
    send_at: '2024-09-15T01:30:00Z',
  },
  // Entry 2
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '緊急：サーバーダウンの報告があります。すぐに対応が必要です。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543211',
    send_at: '2024-09-15T05:45:00Z',
  },
  // Entry 3
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '新機能のベータテストが成功しました！フィードバックは非常に良好です。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543212',
    send_at: '2024-09-16T00:15:00Z',
  },
  // Entry 4
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'Pull Request #42: バグ修正とパフォーマンス改善',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543213',
    send_at: '2024-09-16T07:20:00Z',
  },
  // Entry 5
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '週次プログレスレポートを共有しました。目標達成に向けて順調です！',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543214',
    send_at: '2024-09-17T02:00:00Z',
  },
  // Entry 6
  {
    id: '123e4567-e89b-12d3-a456-426614174005',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'セキュリティアップデート：全員のパスワード変更が必要です。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543215',
    send_at: '2024-09-17T09:30:00Z',
  },
  // Entry 7
  {
    id: '123e4567-e89b-12d3-a456-426614174006',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'Issue #99: 新しい機能リクエスト - ユーザーダッシュボードの改善',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543216',
    send_at: '2024-09-17T23:45:00Z',
  },
  // Entry 8
  {
    id: '123e4567-e89b-12d3-a456-426614174007',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '新しいプロジェクトの開始についての会議が設定されました。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543217',
    send_at: '2024-09-19T00:00:00Z',
  },
  // Entry 9
  {
    id: '123e4567-e89b-12d3-a456-426614174008',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '全体ミーティングのスケジュールが変更されました。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543218',
    send_at: '2024-09-20T01:00:00Z',
  },
  // Entry 10
  {
    id: '123e4567-e89b-12d3-a456-426614174009',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'Issue #100: バグ修正の提案 - 新しいメニューの追加',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543219',
    send_at: '2024-09-23T02:15:00Z',
  },
  // Entry 11
  {
    id: '123e4567-e89b-12d3-a456-426614174010',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '新しいデザイン案が完成しました。確認をお願いします。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543220',
    send_at: '2024-09-24T00:30:00Z',
  },
  // Entry 12
  {
    id: '123e4567-e89b-12d3-a456-426614174011',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '重要なお知らせ：会社方針の変更について',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543221',
    send_at: '2024-09-24T05:00:00Z',
  },
  // Entry 13
  {
    id: '123e4567-e89b-12d3-a456-426614174012',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '新入社員の歓迎会を開催します！',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543222',
    send_at: '2024-09-25T01:15:00Z',
  },
  // Entry 14
  {
    id: '123e4567-e89b-12d3-a456-426614174013',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'マーケティング戦略のプレゼン資料を共有しました。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543223',
    send_at: '2024-09-25T06:45:00Z',
  },
  // Entry 15
  {
    id: '123e4567-e89b-12d3-a456-426614174014',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'アイデアブレインストーミングセッションを開催しましょう。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543224',
    send_at: '2024-09-26T00:00:00Z',
  },
  // Entry 16
  {
    id: '123e4567-e89b-12d3-a456-426614174015',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '緊急メンテナンスのお知らせ',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543225',
    send_at: '2024-09-26T08:30:00Z',
  },
  // Entry 17
  {
    id: '123e4567-e89b-12d3-a456-426614174016',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'ドキュメント更新のお知らせ',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543226',
    send_at: '2024-09-26T23:15:00Z',
  },
  // Entry 18
  {
    id: '123e4567-e89b-12d3-a456-426614174017',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'ランチミーティングを企画しました。',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543227',
    send_at: '2024-09-28T03:00:00Z',
  },
  // Entry 19
  {
    id: '123e4567-e89b-12d3-a456-426614174018',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: '重要：システム障害の報告',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543228',
    send_at: '2024-09-29T07:45:00Z',
  },
  // Entry 20
  {
    id: '123e4567-e89b-12d3-a456-426614174019',
    app: 'slack',
    sender_image:
      'https://avatars.slack-edge.com/2024-09-14/7714248711079_47e40940231bd2c246df_48.jpg',
    sender_name: '山下竜之介',
    server_image:
      'https://avatars.slack-edge.com/2024-09-15/7753453212368_99bdd2baa99a757b64a4_34.png',
    server_name: 'All-in',
    channel_name: 'botテスト',
    content: 'アップデート：新機能のリリースについて',
    message_link: 'https://slack.com/archives/C01234ABCD/p9876543229',
    send_at: '2024-09-30T00:00:00Z',
  },
];
