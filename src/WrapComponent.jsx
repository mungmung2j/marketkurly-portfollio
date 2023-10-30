import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
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


    //모달창
    //최근 본 상품 상태관리 변수
    const [state, setState] = React.useState({
        isMainModal:true,
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
        let img='';
        /* console.log(imgPath);
        console.log(imgPath.indexOf(`section3`)); */

        //검색이 완료되면 글자 위치를 정수로 표현 출력
        //검색이 안되면 -1을 출력
        if(imgPath.indexOf('section3')!==-1){
            img='08c24fb2-96c0-4109-9ab7-f8d7e334bdc4.jpeg';
            

        }
        setState({
            viewProduct:{
                제품코드:item.제품코드,
                제품이미지:`${imgPath}${img===''?item.제품이미지:img}`,
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


    //모달창 닫기
    const modalCloseMethod=(expires)=>{

        setState({
            ...state,
            isMainModal:false
        })

        if(expires===1){
            //오늘 날짜+1
            let toDay=new Date();
            toDay.setDate(toDay.getDate()+1);//하루

/*             toDay.setUTCMinutes(toDay.getMinutes()+1); //1분
 */            const obj ={
                id:"main_modal_2023102801",
                expires:toDay.getTime()
            }
            localStorage.setItem('KURLY_MAIN_MODAL', JSON.stringify(obj));
        }
    }

    //로딩 시 메인모달 만료일 expires체크
    //로컬스토리지 저장소 데이터 가져와서 비교
    //만료일이 남았으면 모달창 false
    //만료일이 지나면 모달창 true 그리고 로컬스토리지 저장소 데이터 삭제
    React.useEffect(()=>{
        try{
            const result = JSON.parse(localStorage.getItem('KURLY_MAIN_MODAL'));
            
            const toDay=new Date();
            if(toDay>result.expires){
                setState({
                    ...state,
                    isMainModal:true
                })
                localStorage.removeItem('KURLY_MAIN_MODAL')
            }
            else{
                setState({
                    ...state,
                    isMainModal:false
                })
            }
        }
        catch{

        }

        

    },[])



    return(
        <div id="wrap">
            {  topModal && <TopModalComponent setTopModal={setTopModal} />}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HeaderComponent/>} >
                        <Route index element={<MainComponent viewProductSetter={viewProductSetter}/>}/>

                        <Route path="/index" element={<MainComponent viewProductSetter={viewProductSetter}/>}/>
                        <Route path="/sub1" element={<Sub1Component />}/>
                        <Route path="/sub2" element={<Sub2Component />}/>
                        <Route path="/sub3" element={<Sub3Component />}/>
                        <Route path="/sub4" element={<Sub4Component />}/>
                        <Route path="/signup" element={<SignUpComponent />}/>
                        <Route path="/signin" element={<SignInComponent />}/>
                        <Route path="/idsearch" element={<SignInIdSearchComponent />}/>
                        <Route path="/pwsearch" element={<SignInPwSearchComponent /> }/>
                        <Route path="/notice" element={<NoticeComponent />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <FooterComponent />
            <QuickMenuComponent product={product} />
            <GoTopComponent />
            {state.isMainModal&&<MainModalComponent modalCloseMethod={modalCloseMethod}/>}
        </div>
    )
}