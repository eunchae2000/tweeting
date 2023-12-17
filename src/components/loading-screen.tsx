import { styled } from "styled-components";

// styled-components 사용하는 이유
// 일반적인 CSS 모듈 방식으로 작업할 경우, 코드 가독성이 떨어짐
// html 태그 보다 무슨 뜻인지 한 눈에 알 수 있는 component 명을 짓는 것이 유리함
// 직접 style 속성을 부여할 경우, hover, active와 같은 속성을 사용할 수 없다.


const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.span`
  font-size: 24px;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}
