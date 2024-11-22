import React from 'react'

import {
  Body,
  Column,
  Container,
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
}

function AutoReplyEmail({
  userName,
  inquiryContent,
  inquiryType,
  email,
}: Props) {
  return (
    <Html>
      <Tailwind>
        <Section className="my-[20px] px-[32px] pt-[40px]">
          <Row>
            <Column align="center">
              <Text className="text-2xl font-bold">Naoki Hayashida</Text>
            </Column>
          </Row>
        </Section>
        <Section>
          <Row className="mt-[10px]">
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <Link href="#">
                <Img
                  alt="X"
                  className="mx-[4px]"
                  height="36"
                  src="https://react.email/static/x-logo.png"
                  width="36"
                />
              </Link>
            </Column>
            <Column align="left" style={{ width: '50%', paddingRight: '8px' }}>
              <Link href="#">
                <Img
                  alt="Instagram"
                  className="mx-[4px]"
                  height="36"
                  src="https://react.email/static/instagram-logo.png"
                  width="36"
                />
              </Link>
            </Column>
          </Row>
        </Section>

        <Preview>お問い合わせありがとうございます</Preview>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-8 rounded-lg bg-white p-8 shadow-sm">
            {/* メインコンテンツ */}
            <Heading className="mb-6 mt-4 text-2xl font-normal leading-relaxed text-gray-800">
              {userName} 様
            </Heading>
            <Heading className="mb-6 mt-4 text-2xl font-normal leading-relaxed text-gray-800">
              お問い合わせいただきありがとうございます
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

            {/* SNSリンク */}
            <Section className="mt-8 text-center">
              <Text className="mb-4 text-sm font-semibold text-gray-600">
                SNSでもフォローをお願いします
              </Text>
              <Row className="mx-auto w-full max-w-xs justify-center">
                <Column className="px-2">
                  <Link
                    href="https://twitter.com/yourusername"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Twitter
                  </Link>
                </Column>
                <Column className="px-2">
                  <Link
                    href="https://linkedin.com/in/yourusername"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    LinkedIn
                  </Link>
                </Column>
                <Column className="px-2">
                  <Link
                    href="https://github.com/yourusername"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    GitHub
                  </Link>
                </Column>
              </Row>
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
}

export default AutoReplyEmail
