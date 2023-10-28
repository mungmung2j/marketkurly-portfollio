import React from "react";
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';

import MainComponent from './wrap/MainComponent';
import Sub1Component from "./wrap/sub_page/Sub1Component";
import Sub2Component from "./wrap/sub_page/Sub2Component";
import Sub3Component from "./wrap/sub_page/Sub3Component";
import Sub4Component from "./wrap/sub_page/Sub4Component";
import SignUpComponent from "./wrap/sub_user/SignUpComponent";
import SignInComponent from "./wrap/sub_user/SignInComponent";
import SignInIdSearchComponent from "./wrap/sub_user/SignInIdSearchComponent";
import SignInPwSearchComponent from "./wrap/sub_user/SignInPwSearchComponent";
import NoticeComponent from "./wrap/sub_user/NoticeComponent";

import FooterComponent from './wrap/FooterComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';
import GoTopComponent from './wrap/GoTopComponent';
import MainModalComponent from './wrap/MainModalComponent';


export default function WrapComponent(){

    //저장소 저장되면 알리는 깃발 flag
    const [flag, setFlag]=React.useState(false);
    //퀵메뉴 전달할 상태변수
    const [product, setProduct]=React.useState([]);


    //최근 본 상품 상태관리 변수
    const [state, setState] = React.useState({
        viewProduct:{
            제품코드:'',
            제품이미지:'',
            제품명:'',
            할인율:'',
            정가:'',
            판매가:'',
            리뷰:'',
            일시:''
        }
    });

    //2.최근 본 상품 상태변수 변경하는 메서드
    const viewProductSetter=(item, imgPath)=>{
        setState({
            viewProduct:{
                제품코드:item.제품코드,
                제품이미지:`${imgPath}${item.제품이미지}`,
                제품명:item.제품명,
                할인율:item.할인율,
                정가:item.정가,
                판매가:item.정가*(1-(item.할인율)),
                리뷰:item.리뷰,
                일시: new Date().getTime()
            }
        })
    }

    //3. 최근본상품 상태변수 값 들어오면 useEffect();
    //   저장 키(key)
    //   브라우저 저장 로컬스토레이지에 저장한다.
    //   단 저장에 데이터가 비어 있다면
    //   만약 상태변수에 값이 있는경우만 *주의
    //   배열로 저장에 저장한다.

    //   만약 저장에 데이터가 있다면
    //   저장된 데이터를 가져온다(JSON.parse()) 객체로 다시변환
    //   그리고 그데이터 맨위에 최근 본 데이터를 삽입한다.
    //   저장방식 스택구조 최근 본 상품데이터 맨위에 삽입한다.
    React.useEffect(()=>{
        let imsi=[]; //배열의 길이는 length
        //객체는 {} 항목(key)의 개수를 센다.
        //저장소가 비어있는 경우는 반드시 배열을 만들어서 저장을 해야한다.
        if(localStorage.getItem('KURLY_VIEW_PRODUCT')===null){
            if(Object.keys(state.viewProduct).length>0 && state.viewProduct.제품코드!==''){//상태변수 객체를 비어있는지를 점검
                imsi=[state.viewProduct];
                localStorage.setItem('KURLY_VIEW_PRODUCT', JSON.stringify(imsi));
                setFlag(!flag);//true=>false  !false=>true
            }
        }
        else{
            imsi=JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));

            //중복 데이터는 저장안함
            let res=imsi.map((item)=>item.제품코드===state.viewProduct.제품코드); //같으면 true 배열로 저장
            res.includes(true)//res 배열안에 true가 포함되어있니? 중복된 데이터가 있니?
            //중복데이터 아닌것 && 객체{}키가 있는것 &&키에 값 value이 있는것
            if(res.includes(true)!==true && Object.keys(state.viewProduct).length>0 && state.viewProduct.제품코드!==''){
                imsi=[state.viewProduct, ...imsi];//맨 위에 저장(삽입) 스택 후입선출
                //imsi=[...imsi, state.viewProduct];//맨 아래에 저장(삽입) 큐 선입선출법

                localStorage.setItem('KURLY_VIEW_PRODUCT', JSON.stringify(imsi));  // 저장소 저장
                setFlag(!flag);//true=>false  !false=>true

            }
        }


    },[state.viewProduct])


    //4. 깃발 신호 발생(저장소에 개체 데이터가 저장되면)
    //4. 저장소에 개체 데이터가 저장되면 즉시 
    //   우측 퀵메뉴에 데이터 보내기 
    //   로컬스토레이지 데이터 가져와서 저장하기
    React.useEffect(()=>{
        if(localStorage.getItem('KURLY_VIEW_PRODUCT')===null){
            return;
        }
        else{
            let imsi=JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));
            setProduct(imsi);
        }
    },[flag]);//깃발신호 발생되면


    const [hide, setHide] = React.useState(false);

    // 변수 : 상태관리(Statement)
    // useState();
    const [topModal, setTopModal] = React.useState(true);

    // 로딩시 또는 새로고침시 동작
    React.useEffect(()=>{
        // 로컬스토레이지 만료기한 확인
        // 만약 topmodal 키가 없다면
        if(localStorage.getItem('topmodal')===null) return;
        
        const result = JSON.parse(localStorage.getItem('topmodal')); // 문자열을 데이터로 변환        
        // const result = Number(localStorage.getItem('topmodal')); // 문자열을 숫자로 변환
        console.log( result );
        console.log( new Date(result) );
        // 만료일이 지금 현재 날짜보다 더크면 모달창 숨긴다.(만료일 남았다)
        if( result > new Date() ){
            setTopModal(false);
        }
        else {  // 아니면 보인다. 만료일 지나면
            setTopModal(true);
            // 로컬스토레이지 키 삭제
            localStorage.removeItem('topmodal');
        }
    },[]); // 빈배열을 사용 1회만 실행하도록

    return(
        <div id="wrap">
            {   // 상태변수가 => 프롭스(부모컴포넌트가 자식컴포넌트에게 내려주는변수값, 함수)
                topModal && <TopModalComponent setTopModal={setTopModal} />
            }
            <HeaderComponent />
            <MainComponent viewProductSetter={viewProductSetter}/>
            {hide && <Sub1Component />}
            {hide && <Sub2Component />}
            {hide && <Sub3Component />}
            {hide && <Sub4Component />}
            {hide && <SignUpComponent />}
            {hide && <SignInComponent />}
            {hide && <SignInIdSearchComponent />}
            {hide && <SignInPwSearchComponent /> }
            {hide && <NoticeComponent />}
            <FooterComponent />
            <QuickMenuComponent product={product} />
            <GoTopComponent />
            {hide && <MainModalComponent />}
        </div>
    )
}