import React from "react";
import './scss/slide20.scss';
import axios from "axios";


export default function Section7Component({viewProductSetter}){
    const [state, setState]=React.useState({
        캡션:{},
        상품:[]
    });

    React.useEffect(()=>{
        axios({
            url:'./data/intro/section7.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    캡션:res.data.section7.caption,
                    상품:res.data.section7.product
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);


    const refSlideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);

    const mainSlide=()=>{
        refSlideWrap.current.style.transition = `all 0.5s`;
        refSlideWrap.current.style.transform = `translateX(${-1068*cnt}px)`;
    }

    React.useEffect(()=>{
        mainSlide();
    },[cnt]);


    const onClickNextArrowBtn=(e)=>{
        e.preventDefault();
        if(cnt>=4){
            setCnt(4);
        }
        else{
            setCnt(cnt+1);
        }       
    }
    const onClickPrevArrowBtn=(e)=>{
        e.preventDefault();        
        if(cnt<=0){
            setCnt(0);
        }
        else{
            setCnt(cnt-1);
        }
    }

    //1.최근 본 상품 클릭 이벤트
    const onClickViewProduct=(e, item, imgPath)=>{
        e.preventDefault();
        
        //최상위 컴포넌트에 있는 메서드에게 전달
        viewProductSetter(item, imgPath);
    }

    return(
        <section id="section7"  className="intro-slide20">
            <div className="container">
                <div className="title">
                    <h2><a href="!#">{state.캡션.캡션1}</a></h2>
                    <h3>{state.캡션.캡션2}</h3>
                </div>
                <div className="content">
                    <div className="slide-container">
                        <div className="slide-view">
                            <ul ref={refSlideWrap} className="slide-wrap">
                                {state.상품.map((item, idx)=>{
                                    return(
                                        <li className={`slide slide${idx+1}`} key={item.제품코드}>
                                            <div className="gap" onClick={(e)=>onClickViewProduct(e, item, './img/intro/section7/')}>
                                                <div className="img-box"><img src={`./img/intro/section7/${item.제품이미지}`} alt="" /></div>
                                                <div className="txt-box">
                                                    <a href="!#"><img src="./img/intro/section7/icon_cart_black.svg" alt="" />담기</a>
                                                    <h3>{item.제품명}</h3>
                                                    <h4>{item.정가}원</h4>
                                                    <h5><strong>{(item.할인율)*100}%</strong> <em>{item.정가*(1-item.할인율)}원</em></h5>
                                                    <h6><img src="./img/intro/section7/icon_mal.svg" alt="" />{item.리뷰}</h6>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                    
                                })
                                }
                                
                            </ul>
                        </div>

                        <a href="!#" onClick={onClickNextArrowBtn} className="next-arrow-btn blind">next-arrow-btn</a>
                        <a href="!#" onClick={onClickPrevArrowBtn} className="prev-arrow-btn blind">prev-arrow-btn</a>

                    </div>
                </div>
            </div>
        </section>
    )
}