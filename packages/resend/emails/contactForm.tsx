import * as React from 'react'

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

type Props = {
  userName: string
  inquiryContent: string
  inquiryType: string
  email: string
  phoneNumber: string
  privacyPolicy: boolean
}

export const AutoReplyEmail = ({
  userName,
  inquiryContent,
  inquiryType,
  email,
  phoneNumber,
  privacyPolicy,
}: Props) => (
  <Html>
    <Tailwind>
      <Head />
      <Preview>お問い合わせありがとうございます</Preview>
      <Body className="bg-gray-50 font-sans">
        {/* ヘッダーセクション */}
        <Section className="border-b border-gray-200 bg-white px-6 py-4">
          <Row>
            <Column>
              <Img
                src="https://your-domain.com/logo.png"
                width="40"
                height="40"
                alt="Company Logo"
                className="h-10 w-10"
              />
            </Column>
            <Column className="text-right">
              <Row>
                <Column className="px-2">
                  <Link href="https://twitter.com/your-handle">
                    <Img
                      src="https://your-domain.com/twitter.png"
                      width="24"
                      height="24"
                      alt="Twitter"
                      className="h-6 w-6"
                    />
                  </Link>
                </Column>
                <Column className="px-2">
                  <Link href="https://facebook.com/your-page">
                    <Img
                      src="https://your-domain.com/facebook.png"
                      width="24"
                      height="24"
                      alt="Facebook"
                      className="h-6 w-6"
                    />
                  </Link>
                </Column>
                <Column className="px-2">
                  <Link href="https://instagram.com/your-account">
                    <Img
                      src="https://your-domain.com/instagram.png"
                      width="24"
                      height="24"
                      alt="Instagram"
                      className="h-6 w-6"
                    />
                  </Link>
                </Column>
              </Row>
            </Column>
          </Row>
        </Section>

        <Container className="mx-auto my-8 rounded-lg bg-white p-8 shadow-sm">
          {/* メインコンテンツ */}
          <Heading className="mb-6 mt-4 text-2xl font-normal leading-relaxed text-gray-800">
            {userName} 様、お問い合わせいただきありがとうございます
          </Heading>

          <Text className="mb-6 text-base leading-relaxed text-gray-600">
            以下の内容でお問い合わせを承りました。内容を確認の上、担当者より順次ご連絡させていただきます。
            今しばらくお待ちくださいますようお願い申し上げます。
          </Text>

          {/* 問い合わせ内容 */}
          <Section className="mb-6 rounded-lg bg-gray-50 p-6">
            <div className="space-y-4">
              <div>
                <Text className="mb-1 text-sm font-semibold text-gray-600">
                  【お問い合わせ種類】
                </Text>
                <Text className="text-base text-gray-800">{inquiryType}</Text>
              </div>

              <div>
                <Text className="mb-1 text-sm font-semibold text-gray-600">
                  【メールアドレス】
                </Text>
                <Text className="text-base text-gray-800">{email}</Text>
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
              © 2024 Your Company Name. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default AutoReplyEmail
