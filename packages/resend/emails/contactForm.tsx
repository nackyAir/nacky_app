import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

type Props = {
  userName: string
  companyName?: string | null
  inquiryContent: string
  inquiryType: string
  email: string
  phoneNumber: string
  privacyPolicy: boolean
}

const inquiryTypes: Record<string, string> = {
  inquiry: 'お問い合わせ',
  recruit: '採用について',
  other: 'その他',
}

export const AutoReplyEmail = ({
  userName,
  companyName,
  inquiryContent,
  inquiryType,
  email,
  phoneNumber,
}: Props) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
        <Container className="mx-auto my-8 max-w-2xl">
          {/* ヘッダーセクション */}
          <Section className="mb-8 rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-white"></div>
            </div>
            <Heading className="text-3xl font-bold text-white mb-2">
              お問い合わせを受付いたしました
            </Heading>
            <Text className="text-blue-100 text-lg">
              ご連絡いただき、誠にありがとうございます
            </Text>
          </Section>

          {/* メインコンテンツ */}
          <Section className="bg-white px-8 py-8 shadow-lg">
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              {companyName ? `${companyName}` : ''} {userName} 様
            </Text>

            <Text className="mb-8 text-base leading-relaxed text-gray-600">
              以下の内容でお問い合わせを承りました。
              <br />
              内容を確認の上、担当者より
              <span className="font-semibold text-blue-600">1-2営業日以内</span>
              にご連絡させていただきます。
            </Text>

            {/* お問い合わせ内容カード */}
            <Section className="mb-8 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 p-6">
              <Heading className="mb-6 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                📋 お問い合わせ内容
              </Heading>

              <div className="space-y-5">
                {companyName && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div className="flex-1">
                      <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        会社名・組織名
                      </Text>
                      <Text className="text-base font-medium text-gray-800">
                        {companyName}
                      </Text>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      お名前
                    </Text>
                    <Text className="text-base font-medium text-gray-800">
                      {userName}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                    <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      メールアドレス
                    </Text>
                    <Text className="text-base font-medium text-gray-800">
                      {email}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                    <div className="h-2 w-2 rounded-full bg-orange-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      お電話番号
                    </Text>
                    <Text className="text-base font-medium text-gray-800">
                      {phoneNumber}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
                    <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      お問い合わせ種別
                    </Text>
                    <Text className="text-base font-medium text-gray-800">
                      {inquiryTypes[inquiryType] || inquiryType}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
                    <div className="h-2 w-2 rounded-full bg-rose-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      お問い合わせ内容
                    </Text>
                    <div className="mt-2 rounded-lg bg-white p-4 border border-gray-200">
                      <Text className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">
                        {inquiryContent}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* 次のステップセクション */}
            <Section className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-200">
              <Heading className="mb-4 text-lg font-semibold text-blue-900">
                ✨ 今後の流れ
              </Heading>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                    1
                  </div>
                  <Text className="text-blue-800">
                    内容確認・担当者振り分け
                  </Text>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                    2
                  </div>
                  <Text className="text-blue-800">1-2営業日以内にご連絡</Text>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                    3
                  </div>
                  <Text className="text-blue-800">
                    詳細なご相談・サポート開始
                  </Text>
                </div>
              </div>
            </Section>

            <Section className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <Text className="text-sm text-amber-800">
                <span className="font-semibold">📌 重要:</span>{' '}
                このメールは自動送信されています。
                このメールに返信いただいてもお答えできない場合がございます。
                ご質問がございましたら、改めてお問い合わせフォームをご利用ください。
              </Text>
            </Section>
          </Section>

          {/* フッター */}
          <Section className="rounded-b-2xl bg-gray-900 px-8 py-8 text-center">
            <Text className="text-gray-300 text-sm mb-2">
              お問い合わせいただき、ありがとうございました
            </Text>
            <Text className="text-gray-500 text-xs">
              © 2024 Naoki Hayashida. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

// 管理者宛て通知メール
export const AdminNotificationEmail = ({
  userName,
  companyName,
  inquiryContent,
  inquiryType,
  email,
  phoneNumber,
}: Props) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-gradient-to-br from-red-50 to-orange-50 font-sans">
        <Container className="mx-auto my-8 max-w-2xl">
          {/* 緊急通知ヘッダー */}
          <Section className="mb-8 rounded-t-2xl bg-gradient-to-r from-red-600 to-orange-600 px-8 py-12 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <Text className="text-red-600 text-lg font-bold">!</Text>
              </div>
            </div>
            <Heading className="text-3xl font-bold text-white mb-2">
              新しいお問い合わせが届きました
            </Heading>
            <Text className="text-orange-100 text-lg">対応が必要です</Text>
          </Section>

          {/* メインコンテンツ */}
          <Section className="bg-white px-8 py-8 shadow-lg">
            <div className="mb-6 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 p-4 border border-red-200">
              <Text className="text-lg font-semibold text-red-800">
                🚨 至急対応: {companyName ? `${companyName}` : ''} {userName}{' '}
                様からお問い合わせ
              </Text>
              <Text className="text-sm text-red-600 mt-1">
                送信日時: {new Date().toLocaleString('ja-JP')}
              </Text>
            </div>

            {/* 顧客情報カード */}
            <Section className="mb-8 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 p-6">
              <Heading className="mb-6 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                👤 顧客情報
              </Heading>

              <div className="space-y-5">
                {companyName && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div className="flex-1">
                      <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        会社名・組織名
                      </Text>
                      <Text className="text-base font-medium text-gray-800">
                        {companyName}
                      </Text>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      お名前
                    </Text>
                    <Text className="text-base font-medium text-gray-800">
                      {userName}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                    <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      メールアドレス
                    </Text>
                    <Text className="text-base font-medium text-blue-600 underline">
                      {email}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                    <div className="h-2 w-2 rounded-full bg-orange-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      お電話番号
                    </Text>
                    <Text className="text-base font-medium text-gray-800">
                      {phoneNumber}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
                    <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <div className="flex-1">
                    <Text className="mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      お問い合わせ種別
                    </Text>
                    <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {inquiryTypes[inquiryType] || inquiryType}
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* お問い合わせ内容 */}
            <Section className="mb-8 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6">
              <Heading className="mb-4 text-lg font-semibold text-red-800 border-b border-red-200 pb-3">
                💬 お問い合わせ内容
              </Heading>
              <div className="rounded-lg bg-white p-4 border border-red-200">
                <Text className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">
                  {inquiryContent}
                </Text>
              </div>
            </Section>

            {/* アクションアイテム */}
            <Section className="mb-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 border border-green-200">
              <Heading className="mb-4 text-lg font-semibold text-green-900">
                ✅ 対応チェックリスト
              </Heading>
              <div className="space-y-2">
                <Text className="text-green-800">□ 内容確認・緊急度判定</Text>
                <Text className="text-green-800">□ 担当者アサイン</Text>
                <Text className="text-green-800">□ 1-2営業日以内の返信</Text>
                <Text className="text-green-800">□ 顧客フォローアップ</Text>
              </div>
            </Section>
          </Section>

          {/* フッター */}
          <Section className="rounded-b-2xl bg-gray-900 px-8 py-8 text-center">
            <Text className="text-gray-300 text-sm mb-2">
              お問い合わせ管理システム
            </Text>
            <Text className="text-gray-500 text-xs">
              © 2024 Naoki Hayashida. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default AutoReplyEmail
