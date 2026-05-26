import type { Metadata } from 'next';
import LegalHeader from '@/components/legal/LegalHeader';

export const metadata: Metadata = {
  title: '이용약관',
};

interface TermsSection {
  title: string;
  content: string | string[];
  description?: string;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    title: '제1조 (목적)',
    content:
      '본 약관은 모아쌤 운영팀이 제공하는 모아쌤 서비스의 이용과 관련하여 운영팀과 이용자 간의 기본적인 사항을 정하는 것을 목적으로 합니다.',
  },
  {
    title: '제2조 (용어의 정의)',
    content: [
      '"서비스"란 모아쌤에서 제공하는 활동 자료 공유, 게시글·댓글 작성, AI 관찰일지 생성, AI 생성횟수 이용 등의 기능을 말합니다.',
      '"이용자"란 서비스를 이용하는 모든 사용자를 말합니다.',
      '"회원"이란 소셜 로그인을 통해 서비스에 가입한 이용자를 말합니다.',
      '"AI 생성 결과"란 회원이 입력한 내용을 바탕으로 생성된 관찰일지 초안을 말합니다.',
    ],
  },
  {
    title: '제3조 (약관의 효력 및 변경)',
    content:
      '본 약관은 서비스 화면 또는 연결된 페이지에서 게시함으로써 효력이 발생합니다. 운영팀은 서비스 개선이나 운영상 필요에 따라 약관을 변경할 수 있으며, 변경 시 서비스 내 공지 또는 화면을 통해 안내합니다.',
  },
  {
    title: '제4조 (회원가입 및 계정 관리)',
    content:
      '회원은 운영팀이 제공하는 소셜 로그인 방식을 통해 가입할 수 있습니다. 회원은 본인의 계정을 직접 관리해야 하며, 타인의 계정을 사용하거나 자신의 계정을 다른 사람에게 빌려주어서는 안 됩니다.',
  },
  {
    title: '제5조 (서비스의 제공)',
    content:
      '운영팀은 게시글 작성, 댓글 작성, 좋아요, 북마크, 파일 업로드, AI 관찰일지 생성, 크레딧 관리 등의 기능을 제공합니다. 서비스 기능은 개발 및 운영 상황에 따라 변경되거나 일부 중단될 수 있습니다.',
  },
  {
    title: '제6조 (AI 관찰일지 생성 서비스)',
    content:
      '회원은 연령, 교육·보육과정, 관찰 상황, 5개 영역 등을 입력하여 AI 관찰일지 초안을 생성할 수 있습니다. AI 생성 결과는 참고용이며, 실제 교육 현장에서 활용하기 전 회원이 직접 검토하고 수정해야 합니다.',
  },
  {
    title: '제7조 (개인정보 및 영유아 정보 입력 제한)',
    content:
      '회원이 게시글, 댓글, 첨부파일, 관찰 상황 입력란 등에 영유아 또는 제3자를 직접 식별할 수 있는 이름, 연락처, 주소, 사진, 주민등록번호 등 개인정보를 입력하거나 업로드하지 않아야 합니다. 운영팀은 개인정보 노출 우려가 있는 콘텐츠를 삭제하거나 이용을 제한할 수 있습니다.',
  },
  {
    title: '제8조 (AI 생성횟수)',
    content:
      '서비스는 AI 관찰일지 생성 등 일부 기능 이용을 위해 AI 생성횟수를 사용할 수 있습니다. AI 생성횟수는 서비스 운영 정책에 따라 지급, 차감, 또는 조정될 수 있습니다. 현재 AI 생성횟수가 무료로 제공되는 경우, 현금 환불이나 교환은 제공되지 않습니다.',
  },
  {
    title: '제9조 (게시물 및 첨부파일)',
    content:
      '회원이 작성한 게시글, 댓글, 첨부파일에 대한 책임은 원칙적으로 회원에게 있습니다. 회원은 타인의 저작권, 개인정보, 명예, 권리를 침해하는 내용을 게시해서는 안 됩니다.',
  },
  {
    title: '제10조 (콘텐츠의 권리)',
    content:
      '회원이 서비스에 게시한 콘텐츠의 권리는 원칙적으로 회원에게 있습니다. 다만 운영팀은 서비스 운영, 노출, 백업, 복구, 고객 문의 대응, 서비스 개선 등을 위한 범위 내에서 이용할 수 있습니다.',
  },
  {
    title: '제11조 (금지행위)',
    description: '회원은 다음 행위를 해서는 안 됩니다.',
    content: [
      '타인의 계정 사용 또는 도용',
      '허위 정보 입력',
      '타인의 권리 침해',
      '개인정보 무단 수집 또는 공개',
      '불법적이거나 부적절한 콘텐츠 게시',
      '서비스의 정상적인 운영을 방해하는 행위',
      'AI 기능을 악용하거나 부정한 방식으로 사용하는 행위',
    ],
  },
  {
    title: '제12조 (서비스 이용 제한)',
    content:
      '운영팀은 회원이 약관을 위반하거나 서비스 운영에 지장을 주는 경우 게시물 삭제, 기능 제한, 계정 이용 제한 등의 조치를 할 수 있습니다. 또한, 운영팀은 사안의 중대성에 따라 사전 통지 없이 조치를 취할 수 있습니다.',
  },
  {
    title: '제13조 (회원탈퇴)',
    content:
      '회원은 언제든지 탈퇴를 요청할 수 있습니다. 탈퇴 시 운영팀은 관련 법령과 개인정보처리방침에 따라 회원 정보를 삭제하거나 비식별 처리합니다.',
  },
  {
    title: '제14조 (서비스의 변경 및 중단)',
    content:
      '운영팀은 개발, 점검, 오류 수정, 외부 서비스 장애, 운영상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 일시 중단할 수 있습니다.',
  },
  {
    title: '제15조 (면책)',
    content:
      '운영팀은 AI 생성 결과의 정확성, 완전성, 특정 목적에 대한 적합성을 보장하지 않습니다. 이용자가 입력한 정보나 게시한 콘텐츠로 인해 발생한 문제는 해당 이용자에게 책임이 있습니다. 또한, 운영팀은 천재지변, 외부 서비스 장애, 시스템 오류 등 불가항력으로 인한 서비스 장애에 대해 책임을 지지 않습니다.',
  },
  {
    title: '제16조 (분쟁해결)',
    content:
      '서비스 이용과 관련하여 분쟁이 발생한 경우 운영팀과 이용자는 상호 협의하여 해결하도록 노력합니다.',
  },
  {
    title: '제17조 (부칙)',
    content: '본 약관은 2026년 5월 30일부터 적용됩니다.',
  },
];

export default function TermsPage() {
  return (
    <>
      <LegalHeader
        title="이용약관"
        effectiveDate="2026.5.30"
        bannerText="꼭 확인해주세요"
        bannerDescription="모아쌤에서는 영유아의 이름, 연락처, 사진 등 개인을 식별할 수 있는 정보 입력을 권장하지 않습니다."
      />

      <div className="flex flex-col gap-6 md:gap-8 xl:gap-10">
        {TERMS_SECTIONS.map((section) => (
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
          </section>
        ))}
      </div>
    </>
  );
}
