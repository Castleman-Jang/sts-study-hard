import AdminMain from "./layouts/AdminMain"

function App() {
  // 컴포넌트가 렌더링이 된 이후 실행되는 코드 작성할 때 사용
  /*
    useEffect(() => {
      // 실행할 코드
      }, [의존성]);

        패턴 1: 의존성 배열이 없을 때
          모든 렌더링 후에 매번 실행 -> 성능 문제 유바로 거의 안 씀
          ex) 
            useEffect(() => {
              console.log('컴포넌트가 매번 렌더링 될때마다 실행');
            });
        
        패턴 2: 의존성 배열이 비어있을 때
          컴포넌트가 처음 나타날 때 한 번만 실행 -> API 요청, 초기 설정 등에 사용
          ex)
            useEffect(() => {
              console.log('처음 나타날 때 한 번 실행');
            }, []);

        패턴 3: 의존성 배열에 값이 있을 때
          의존성이 바뀔 때마다 실행 -> state, props 감시할 때 사용
          ex)
            useEffect(() => {
              console.log('data가 ${data}값이다');
            }, [data]);

          ex 2)
            useEffect(() => {
              setData(data +1);
            }, [data]); // 계속 바뀌니까 무한 실행 (=무한루프)
  */
  return <AdminMain/>;
}

export default App
