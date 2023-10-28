import React from "react";
import './scss/quickmenu.scss';


export default function QuickMenuComponent({product}){    

    const [quickMenu, setQuickMenu] = React.useState(false);
    const [viewProduct, setViewProduct] = React.useState(false);
    
    React.useEffect(()=>{

        if(product.length>0){
            setViewProduct(true);
        }
        else{
            setViewProduct(false);
        }

        window.addEventListener('scroll', function(){
            let quickMenu = false;
                if(window.scrollY>=460){
                    quickMenu=true;                   
                }
                else {
                    quickMenu=false;
                }
                // 상태변수 변경 세터함수1회설정
                setQuickMenu(quickMenu);
        }); 

    },[product]);

    return(
        <div id="quickMenu" className={quickMenu?'on':''}>
            <div className="container">

                <div className="top">
                    <a href="!#"><img src="./img/intro/deliveryInfo.png" alt="" /></a> 
                </div>

                <div className="center">
                    <a href="!#">등급별 혜택</a>
                    <a href="!#">레시피</a>
                </div>

                {
                    viewProduct  &&  (
                        <div className="bottom">
                            <div className="up">
                                <a href="!#"><img src="./img/quick_menu/icon_up.svg" alt="" /></a> 
                                <h2>최근본상품</h2>
                            </div>
                            <div className="list">
                                <ul>
                                    {
                                        product.map((item)=>{
                                            return(
                                                    <li>
                                                        <a href="!#">
                                                            <img src={item.제품이미지} alt="" />
                                                        </a>
                                                    </li> 
                                                )
                                            })
                                        
                                    }
                                </ul>
                            </div>
                            <div className="down">
                            <a href="!#"><img src="./img/quick_menu/icon_up.svg" alt="" /></a> 
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}