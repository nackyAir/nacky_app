import * as React from 'react'

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
      <Body className="bg-gray-50 font-sans">
        {/* ヘッダーセクション */}

        <Container className="mx-auto my-8 rounded-lg bg-white p-8 shadow-sm">
          {/* メインコンテンツ */}
          <Heading className="mb-6 mt-4 text-xl font-normal leading-relaxed text-gray-800">
            {companyName ? `${companyName} ${userName} 様` : `${userName} 様`}
            、お問い合わせいただきありがとうございます
          </Heading>

          <Text className="mb-6 text-base leading-relaxed text-gray-600">
            以下の内容でお問い合わせを承りました。内容を確認の上、担当者より順次ご連絡させていただきます。
            今しばらくお待ちくださいますようお願い申し上げます。
          </Text>

          {/* 問い合わせ内容 */}
          <Section className="mb-6 rounded-lg bg-gray-50 p-6">
            <div className="space-y-4">
              {companyName && (
                <div>
                  <Text className="mb-1 text-sm font-semibold text-gray-600">
                    【会社名】
                  </Text>
                  <Text className="text-base text-gray-800">{companyName}</Text>
                </div>
              )}

              <div>
                <Text className="mb-1 text-sm font-semibold text-gray-600">
                  【お名前】
                </Text>
                <Text className="text-base text-gray-800">{userName}</Text>
              </div>

              <div>
                <Text className="mb-1 text-sm font-semibold text-gray-600">
                  【メールアドレス】
                </Text>
                <Text className="text-base text-gray-800">{email}</Text>
              </div>

              <div>
                <Text className="mb-1 text-sm font-semibold text-gray-600">
                  【お電話番号】
                </Text>
                <Text className="text-base text-gray-800">{phoneNumber}</Text>
              </div>

              <div>
                <Text className="mb-1 text-sm font-semibold text-gray-600">
                  【お問い合わせ種類】
                </Text>
                <Text className="text-base text-gray-800">
                  {inquiryTypes[inquiryType]}
                </Text>
              </div>

              <div>
                <Text className="mb-1 text-sm font-semibold text-gray-600">
                  【お問い合わせ内容】
                </Text>
                <Text className="whitespace-pre-wrap text-base text-gray-800">
                  {inquiryContent}
                </Text>
              </div>
            </div>
          </Section>

          <Text className="mt-8 text-sm italic text-gray-500">
            ※このメールは自動送信されています。このメールに返信いただいてもお答えできない場合がございます。
          </Text>

          {/* フッター */}
          <Section className="mt-8 border-t border-gray-200 pt-6">
            <Text className="text-center text-sm text-gray-600">
              © 2024 Naoki Hayashida. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default AutoReplyEmail
