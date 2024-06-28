import React from 'react';
import IntroSection from '../components/IntroSection';
import MainLayout from '../layouts/MainLayout';
import "./IntroPage.css";

const IntroPage = () => (
  <MainLayout>
    <div className="container noto-sans-kr">
      <IntroSection
        imgSrc="/img/introduce-img01.jpg"
        imgAlt="소개 이미지 1"
        title="당스만 - 당신을 스타로 만들어 드립니다."
        text="스트리밍 세계에서 더 많은 시청자를 만나고 싶은신가요? 당스만은 신진 스트리머들을 위한 맞춤형 광고 및 홍보 솔루션을 제공합니다. 유명 스트리머들의 이벤트 배너부터 개인화된 광고 캠페인까지, 당신의 채널을 더 많은 사람들에게 알리세요."
      />
      <IntroSection
        imgSrc="/img/introduce-img02.jpg"
        imgAlt="소개 이미지 2"
        title="당신의 스트리밍 채널을 빛나게 하세요!"
        text="당스만은 스트리머 여러분의 성공을 위해 설계된 통합 홍보 플랫폼입니다. 우리와 함께라면 더 많은 시청자를 만나고, 더 많은 기회를 얻을 수 있습니다. 지금 가입하고, 스타로 거듭나세요!"
      />
      <IntroSection
        imgSrc="/img/introduce-img03.jpg"
        imgAlt="소개 이미지 3"
        title="스트리머 홍보의 모든 것"
        text="신인 스트리머에서 유명 인플루언서까지, 모든 스트리머들을 위한 홍보 플랫폼, 광고를 통한 채널 홍보와 이멘트 배너 제작으로 당신의 스트리밍 채널을 성장시키세요. 당스만과 함께라면 당신도 스타가 될 수 있습니다."
      />
      <IntroSection
        imgSrc="/img/introduce-img04.jpg"
        imgAlt="소개 이미지 4"
        title="스타로 가는 첫걸음, 당스만"
        text="스트리밍 세계에서 두각을 나타내고 싶다면 당스만이 도와 드립니다. 맞춤형 홍보와 다양한 광고 솔루션을 통해 당신의 채널을 더 많은 시청자에게 알리세요. 당스만과 함께 성공의 길을 걷기 시작하세요."
      />
      <IntroSection
        imgSrc="/img/introduce-img05.jpg"
        imgAlt="소개 이미지 5"
        title="당신의 채널을 세계에 알리세요"
        text="스트리머 여러분, 더 많은 시청자를 원하시나요? 당스만은 신진 스트리머를 위한 최적의 홍보 플랫폼입니다. 광고 캠페인과 이벤트 배너를 통해 당신의 채널을 널리 알려보세요. 지금 당스만에 가입하고 스타로 성장하세요."
      />
    </div>

  </MainLayout>
);

export default IntroPage;
