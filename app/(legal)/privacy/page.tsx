import type { Metadata } from 'next';
import { XIcon } from '@/app/assets/icons';
import LegalHeader from '@/components/legal/LegalHeader';

export const metadata: Metadata = {
  title: '개인정보처리방침',
};

interface PrivacySection {
  title: string;
  content: string | string[];
  description?: string;
  xList?: string[];
  subList?: string[];
  subNote?: string;
}

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: '제1조 (개인정보의 처리 목적)',
    content: [
      '회원가입 및 소셜 로그인',
      '회원 식별 및 로그인 유지',
      '게시글, 댓글, 좋아요, 북마크 등 서비스 기능 제공',
      'AI 관찰일지 생성',
      '첨부파일 업로드 및 관리',
      'AI 생성횟수 관리',
      '서비스 오류 확인 및 부정 이용 방지',
      '문의 대응 및 서비스 개선',
    ],
  },
  {
    title: '제2조 (처리하는 개인정보 항목)',
    description: '운영팀은 서비스 제공 과정에서 다음 정보를 처리할 수 있습니다.',
    content: [
      '소셜 로그인 제공자',
      '소셜 로그인 식별값',
      '이메일',
      '닉네임',
      '게시글, 댓글, 첨부파일 정보',
      '관찰일지 생성을 위해 입력한 연령, 교육·보육과정, 관찰 상황, 5개 영역',
      'AI 생성 결과',
      '좋아요, 북마크, 조회 기록',
      'AI 생성횟수 정보',
      '로그인 토큰 및 접속 기록',
    ],
  },
  {
    title: '제3조 (AI 관찰일지 생성 관련 안내)',
    content:
      '회원이 AI 관찰일지 생성을 요청하면 입력한 관찰 상황, 연령, 교육·보육과정, 5개 영역 등이 AI 생성 기능 제공을 위해 처리됩니다. 회원은 다음과 같은 영유아를 직접 식별할 수 있는 정보를 입력하지 않아야 합니다.',
    xList: ['이름', '연락처', '주소', '사진 등 식별 가능한 정보'],
    subNote: 'AI 생성 결과는 참고용 초안이며, 최종 활용 전 회원의 검토가 필요합니다.',
  },
  {
    title: '제4조 (개인정보의 보유 및 이용기간)',
    content:
      '운영팀은 개인정보를 서비스 제공 기간 동안 보관하며, 회원 탈퇴 시 지체 없이 삭제하거나 비식별 처리합니다. 다만 서비스 운영 기록, 분쟁 대응, 법령상 보관이 필요한 정보는 필요한 기간 동안 보관할 수 있습니다.',
    subList: ['회원 정보: 30일', '서비스 이용 기록: 3개월', '접속 로그 및 IP 정보: 3개월'],
  },
  {
    title: '제5조 (개인정보의 제3자 제공)',
    content:
      '운영팀은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만 이용자가 동의한 경우 또는 법령에 따라 요청되는 경우에는 예외적으로 제공될 수 있습니다.',
  },
  {
    title: '제6조 (외부 서비스 이용)',
    content: '운영팀은 서비스 제공을 위해 다음 외부 서비스를 이용할 수 있습니다.',
    subList: [
      '카카오 로그인: 소셜 로그인 제공',
      '네이버 로그인: 소셜 로그인 제공',
      'OpenAI API: AI 관찰일지 생성',
      'NCP Object Storage: 첨부파일 저장',
      'Google Analytics: 서비스 이용 통계 분석',
    ],
  },
  {
    title: '제7조 (국외 이전 가능성)',
    content:
      'AI 관찰일지 생성 과정에서 OpenAI API를 이용하는 경우, 입력 내용이 국외 서버로 전송될 수 있습니다. 운영팀은 AI 기능 제공 목적 범위 내에서만 해당 정보를 처리하며, 이용자는 개인정보나 민감한 정보를 입력하지 않아야 합니다.',
  },
  {
    title: '제8조 (개인정보의 파기)',
    content: '운영팀은 보유 기간이 지나거나 처리 목적이 달성된 개인정보를 삭제합니다.',
    subList: [
      '전자적 파일: 복구가 불가능한 기술적 방법으로 삭제',
      '종이 문서 형태: 분쇄 또는 소각',
    ],
  },
  {
    title: '제9조 (이용자의 권리)',
    content:
      '이용자는 자신의 개인정보에 대해 열람, 수정, 삭제, 처리 정지를 요청할 수 있습니다. 요청은 서비스 내 기능 또는 문의 이메일을 통해 할 수 있습니다.',
  },
  {
    title: '제10조 (쿠키 및 자동 수집 정보)',
    content:
      '서비스는 로그인 유지와 이용 편의를 위해 쿠키 또는 유사한 기술을 사용할 수 있습니다. 또한 서비스 개선을 위해 Google Analytics를 통해 페이지 방문 기록, 접속 기기, 유입 경로 등 익명화된 이용 통계를 수집할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 Google Analytics 차단 부가기능을 설치하여 수집을 거부할 수 있으며, 이 경우 일부 기능 이용이 제한될 수 있습니다.',
  },
  {
    title: '제11조 (개인정보 보호를 위한 조치)',
    content:
      '운영팀은 개인정보가 안전하게 처리될 수 있도록 접근 권한 관리, 인증 정보 보호, 데이터베이스 접근 제한, 외부 노출 방지 등의 조치를 적용합니다.',
  },
  {
    title: '제12조 (개인정보 문의)',
    content: '개인정보 처리과 관련한 문의는 아래 연락처로 할 수 있습니다.',
    subList: ['담당: 모아쌤 운영팀', '이메일: moassam.official@gmail.com'],
  },
  {
    title: '제13조 (개인정보처리방침의 변경)',
    content:
      '본 개인정보처리방침은 2026년 5월 30일부터 시행됩니다. 본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 서비스 내 공지사항 또는 팝업 등을 통해 사전에 안내합니다. 내용이 변경되는 경우 서비스 화면 또는 공지사항을 통해 안내합니다.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <LegalHeader
        title="개인정보처리방침"
        effectiveDate="2026.5.30"
        bannerText="안전한 개인정보 이용을 위해"
        bannerDescription="모아쌤 운영팀은 서비스를 제공함에 있어 이용자의 개인정보를 안전하게 처리하기 위해 다음과 같이 개인정보처리방침을 안내합니다."
      />

      <div className="flex flex-col gap-6 md:gap-8 xl:gap-10">
        {PRIVACY_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 text-base font-semibold text-black-800">{section.title}</h2>
            {section.description && (
              <p className="mb-1 text-sm font-medium text-black-600">{section.description}</p>
            )}
            {Array.isArray(section.content) ? (
              <ul className="flex flex-col gap-1 pl-1 text-sm font-medium text-black-600">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-1 w-1 shrink-0 rounded-full bg-black-600" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-medium text-black-600">{section.content}</p>
            )}
            {section.xList && (
              <ul className="mt-1 flex flex-col gap-1 pl-0.5 text-sm font-medium text-black-600">
                {section.xList.map((item, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <XIcon className="h-2.5 w-2.5 shrink-0 text-[#ff3b30]" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.subList && (
              <ul className="mt-1 flex flex-col gap-1 pl-1 text-sm font-medium text-black-600">
                {section.subList.map((item, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <div className="h-1 w-1 shrink-0 rounded-full bg-black-600" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.subNote && (
              <p className="mt-1 text-sm font-medium text-black-600">{section.subNote}</p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
