import React from "react";
import './scss/Header.scss';

export default function HeaderComponent(){
    const [header, setHeader] = React.useState(false);
    React.useEffect(()=>{
        window.addEventListener('scroll', function(){
            let header = false;
            if(this.window.scrollY>=142){
                header = true;
            }
            else{
                header = false;
            }
            setHeader(header);
        });
    },[]);

    return(
        <header id="header">
            <div className="row1">
                <div className="container">
                    <div className="content">
                        <aside id="aside">
                            <a href="!#" className="on">회원가입</a>
                            <i>|</i>                            
                            <a href="!#">로그인</a>
                            <i>|</i>
                            <a href="!#">고객센터</a>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="row2">
                <div className="container">
                    <div className="content">
                        <div className="left">
                            <a href="!#"><span></span><strong>마켓컬리</strong></a><i>|</i><a href="!#">뷰티컬리</a>
                        </div>
                        <div className={`center${header?' on':''}`}>
                            <input className={header?'on':''} type="text" name="search" id="search" placeholder="검색어를 입력해 주세요" />
                            <button className={header?'on':''}></button>
                        </div>
                        <div className={`right${header?' on':''}`}>
                            <a href="!#"><img src="../../public/img/header/icon_map_off.svg" alt="" /></a>
                            <a href="!#"><img src="../../public/img/header/icon_heart_off.svg" alt="" /></a>
                            <a href="!#"><img src="../../public/img/header/icon_cart_off.svg" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`row3${header?' on':''}`}>
                <div className="container">
                    <div className="content">
                        <div className={`left${header?' on':''}`}>
                            <a href="!#">
                                <span></span>
                                <strong>카테고리</strong>
                            </a>
                        </div>
                        <div className={`center${header?' on':''}`}>
                            <nav>
                                <a href="!#">신상품</a>
                                <a href="!#">베스트</a>
                                <a href="!#">알뜰상품</a>
                                <a href="!#">특가혜택</a>
                            </nav>
                        </div>
                        <div className={`right${header?' on':''}`}>
                            <a href="!#"><em>샛별・택배</em> <span>배송안내</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}