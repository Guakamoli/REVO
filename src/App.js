import React, { useRef, useEffect, useState } from "react";
import styles from "./Styles/index.module.scss";
import "./App.css";
import {useInterval} from "ahooks"
import ReactAudioPlayer from 'react-audio-player';

function App() {
  const [mute, setMute] = useState(true);
  const [rootHight, setRootHight] = useState(800);
  const [isMobile, setIsMobile] = useState(true);
  const [videoUrl, setVideoUrl] = useState("./image/backgroundVideo.mp4");
  const [loadingUrl, setLoadingUrl] = useState({
    video:"./image/loading.mp4",
    image: './image/loadingFirst.jpeg'
  })
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(1000);
  const TWITTER_URL = "https://twitter.com/R3VO_XYZ";
  const CAME_URL = "https://www.instagram.com/r3vo_xyz/";
  const TIKTOK_URL= "https://www.tiktok.com/@r3vo_xyz"
  const DISCORD_URL = "https://discord.gg/WMy2JnamqK";
  const SIG = 'https://sig.com/';
  useEffect(() => {
   
   
    const info = navigator.userAgent;
    const isPhone = /mobile/i.test(info);
    setIsMobile(isPhone);
    if (isPhone) {
      setVideoUrl("./image/backgroundVideo_mobile.mp4");
      setLoadingUrl({
        video:"./image/loading_mobile.mp4",
        image: './image/loadingMobileFirst.jpeg'
        
      })
      setRootHight(document.documentElement?.clientHeight || window.innerHeight);
    }
    if(!isPhone){
      window.addEventListener('resize', () => { //监听浏览器窗口大小改变
        //浏览器变化执行动作
        setRootHight(document.documentElement?.clientHeight || window.innerHeight);
      });
    }

   
   return ()=>{
    window.addEventListener('resize', () => { //监听浏览器窗口大小改变
      //浏览器变化执行动作
      setRootHight(document.documentElement?.clientHeight || window.innerHeight);
});

   }
  }, []);

  useInterval(() => {
    console.info('document.readyState',document.readyState)
    if (document.readyState === 'complete') {
      setInterval(null)
      setTimeout(() =>{
        setLoading(false)
      },4000)
      }
  }, interval);
  const myRef = useRef();
  const musicPlaying = ()=>{
      if(mute){
        myRef.current.audioEl.current.play()
        
      }else{
        myRef.current.audioEl.current.load()
      }
      setMute(!mute);
  }
  const jumpUrl = (url)=>{
    window.open(url,'_blank');
  }
  useEffect(() => {
   
  },[mute])
  return (
    <div className={styles.root} style={{ height:isMobile ? rootHight :'100vh' }}>
      {
         <div style={{ width:"100%",height:"100%", display:loading ? 'flex' :"none" ,justifyContent:'center',alignItems:'center' }} >
            <video
              autoPlay
              muted={true}
              loop="loop"
              playsInline
              x5-video-player-type="h5"
              poster={'./image/loadingFirst.jpeg'}
              className={styles.loading}
              preload="none"
              src={'./image/loading.mp4'}  type="video/mp4" 
              // style={{display:!isMobile ?"flex" :'none'}}
            >
            </video>
          </div>
      }
   
        <div style={{ width:"100%",height:"100%", display:!loading ? 'flex' : 'none' }}>
        <div className={styles.header}>
      <img src="./image/logo@2x.png" className={styles.logo}></img>
      {/* <img src="./image/joinBtn@2x.png" className={styles.joinBtn}></img> */}
        </div>
        <div className={styles.content}>
          <>
            <>
              <video
                autoPlay
                muted={true}
                loop="loop"
                playsInline
                x5-video-player-type="h5"
                poster="./image/videoFirst.png"
                className={styles.bgvid}
              
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              <ReactAudioPlayer
                src="./image/backgroundMusic.mp3"
                controls
                loop
                style={{position: "absolute",opacity:0}}
                ref={myRef}
              />
            </>
            <div className={styles.mask}></div>
          </>
          <div className={styles.title}></div>
          <div className={styles.titleFont}>
            <text style={{ width: 606 }}>
            RΞVO is a Social - Fi video NFT platform that enables users to watch, create and invest in video NFTs while socializing with fans and friends. RΞVO is 100% owned by community. All of our income will be given back to our users and creators.
            </text>
          </div>
          <img src="./image/joinUs@2x.png" className={styles.joinUs} onClick={()=>{jumpUrl(DISCORD_URL)}}></img>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerLogo}>
            <img
              src="./image/twitterLogo@2x.png"
              className={styles.twitterLogo}
              onClick={()=>{jumpUrl(TWITTER_URL)}}
            ></img>
            <img
              src="./image/cameoLogo@2x.png"
              className={styles.cameoLogo}
              onClick={()=>{jumpUrl(CAME_URL)}}
            ></img>
            <img
              src="./image/tiktokLogo@2x.png"
              className={styles.tiktokLogo}
              onClick={()=>{jumpUrl(TIKTOK_URL)}}
            ></img>
              <div onClick={musicPlaying} style={{opacity: isMobile ? 1 : 0}} >
              <img src="./image/mute@2x.png" className={styles.muteImg} style={{display:mute ? 'flex' :'none'}}/>
      
      <img src="./image/playing@2x.gif" className={styles.playingImg} style={{display: !mute ? 'flex' :'none'}}/>
          </div>
          </div>

          <div className={styles.footerBacked}>
            <div
              className={styles.musicControl}
              onClick={musicPlaying}
              style={{ display: isMobile ? 'none':"flex",alignItems : mute ? 'center':'flex-end' }}
            >
              <text className={styles.musicControlfont}>Music Control</text>
              <img src="./image/mute@2x.png" className={styles.muteImg} style={{display:mute ? 'flex' :'none'}}/>
      
      <img src="./image/playing@2x.gif" className={styles.playingImg} style={{display: !mute ? 'flex' :'none'}}/>
            </div>
            <div className={styles.backedControl}>
              <text className={styles.backedfont}>Backed by</text>
              <img src="./image/SIG@2x.png" className={styles.SIG}
              onClick={()=>{jumpUrl(SIG)}}
              ></img>
            </div>
          </div>
        </div>
        </div>      
    </div>
  );
}

export default App;
