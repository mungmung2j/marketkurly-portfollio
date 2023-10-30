import React from "react";
import "./scss/sub.scss";

export default function Sub1Component(){
    return(
        <main id="sub1" className="sub">
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <div className="title-image">
                            <img src="./img/sub/sub1/BIIpXKgtza7xH1045alsczbyX1yy9mvdCgFOe87i.jpg" alt="" />    
                        </div>
                        <div className="title-text">
                            <h2>신상품</h2>
                        </div>
                    </div>
                    <div className="content">
                        <div className="left">
                            <div className="gap">
                                <div className="header">
                                    <h3>필터</h3>
                                    <span>
                                        <img src="./img/sub/icon_reflesh.svg" alt="" />
                                        <button>초기화</button>
                                    </span>
                                </div>
                                <nav className="nav">

                                </nav>
                            </div>
                        </div>
                        <div className="right">
                            <div className="header">
                                <h3>총 255건</h3>
                                <span>
                                    <a href="!#">추천순 <img src="./img/sub/icon_qustion.svg" alt="" /></a>
                                    <a href="!#">신상품순</a>
                                    <a href="!#">판매량순</a>
                                    <a href="!#">혜택순</a>
                                    <a href="!#">낮은 가격순</a>
                                    <a href="!#">높은 가격순</a>
                                </span>
                            </div>
                            <div className="product-box">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}