import ObservationResultCard from '@/components/observations/ObservationResultCard';
import { Button } from '@/components/common/button/Button';

// 임시
const TEMP_RESULT = [
  {
    title: '총평',
    content:
      '짱구는 익숙한 또래와의 관계 속에서 안정감을 바탕으로 놀이와 의사소통에 참여하고 있다. 다만 새로운 또래와의 상호작용에서는 신중한 태도를 보이며, 관계를 확장하는 데 있어 시간이 필요한 모습이다. 지속적인 격려와 긍정적인 경험 제공을 통해 또래 관계의 범위를 점진적으로 넓혀갈 필요가 있다.',
  },
  {
    title: '의사소통',
    content:
      '익숙한 친구들과의 놀이에서 자신의 생각을 말로 표현하며 자연스럽게 대화를 주고받는 모습을 보인다. 놀이 상황에서 역할을 나누며 의사소통을 시도하나, 새로운 친구의 제안에는 즉각적인 언어 표현보다는 관찰을 통해 상황을 파악하려는 태도를 보인다.',
  },
  {
    title: '사회관계',
    content:
      '평소 자주 어울리는 친구들과 안정적인 관계를 형성하며 놀이에 참여한다. 새로운 친구가 놀이에 참여하고자 할 때 다소 신중한 태도를 보이며 기존 관계를 유지하려는 경향이 나타난다. 교사의 격려에 관심을 보이나 적극적인 상호작용으로 확장되기까지는 시간이 필요한 모습이다.',
  },
  {
    title: '자연탐구',
    content:
      '블록놀이 과정에서 구조를 만들고 역할을 나누며 놀이를 지속하는 모습이 관찰된다. 익숙한 환경에서는 놀이에 안정적으로 참여하나, 새로운 상황에서는 즉각적인 탐색보다는 주변을 살피며 신중하게 접근하는 태도를 보인다.',
  },
];

export default function ObservationDetailPage() {
  return (
    <div>
      <div className="flex flex-col gap-5">
        {TEMP_RESULT.map((item) => (
          <ObservationResultCard key={item.title} title={item.title} content={item.content} />
        ))}
      </div>
      <div className="flex justify-end py-15">
        <Button size="md">재생성</Button>
      </div>
    </div>
  );
}
