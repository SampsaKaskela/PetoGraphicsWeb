/** @jsxImportSource @emotion/react */
import { useMemo, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import {
    FadeIn, SlideTopIn, SlideLeftIn, SlideRightIn, SlideBottomIn, WipeLeftIn, WipeTopIn, ExpandYIn, ExpandXIn,
    FadeOut, SlideTopOut, SlideLeftOut, SlideRightOut, SlideBottomOut, WipeLeftOut, WipeTopOut, ExpandYOut, ExpandXOut
} from './Animations';

const animationMap = {
    FadeIn,
    FadeOut,
    SlideTopIn,
    SlideTopOut,
    SlideBottomIn,
    SlideBottomOut,
    SlideLeftIn,
    SlideLeftOut,
    SlideRightIn,
    SlideRightOut,
    WipeLeftIn,
    WipeLeftOut,
    WipeTopIn,
    WipeTopOut,
    ExpandYIn,
    ExpandYOut,
    ExpandXIn,
    ExpandXOut
};

const computeAnimation = (graphic, isIn) => {
    const animation = isIn ? graphic.animationIn : graphic.animationOut;
    return css`
        animation-name: ${animationMap[`${animation.style}${isIn ? 'In' : 'Out'}`](graphic)}${animation.addFade ? css`, ${isIn ? FadeIn(graphic) : FadeOut(graphic)}` : ''};
        animation-duration: ${animation.duration / 1000}s;
        animation-timing-function: ${animation.ease ? 'ease' : 'linear'};
        animation-delay: ${animation.delay / 1000}s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-play-state: running;
    `;
};

const Graphic = ({ graphic, graphicIndex, project }) => {
    const videoRef = useRef();
    const visible = useMemo(() => graphic.visible, [graphic.visible]);
    useEffect(() => {
        if (videoRef.current) {
            if (visible) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [visible]);
    return (
        <div
            style={{
                zIndex: graphicIndex + 1,
                position: 'absolute',
                left: graphic.left,
                top: graphic.top,
                width: graphic.width,
                height: graphic.height,
                backgroundImage: graphic.image && `url(/configs/${project}/${graphic.image})`,
                backgroundSize: graphic.imageStretch === 'fit' ? 'contain' : '100% 100%',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                overflow: 'hidden'
            }} css={computeAnimation(graphic, graphic.visible)}
        >
            {graphic.media && <video ref={videoRef} src={`/configs/${project}/${graphic.media.source}`} loop={graphic.media.loop} style={{ width: '100%', height: '100%' }} />}
            {graphic.texts?.map((text, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: text.left,
                        top: text.top,
                        width: text.width,
                        whiteSpace: text.rich ? 'pre-line' : 'nowrap',
                        fontFamily: text.fontFamily,
                        fontSize: text.fontSize,
                        fontWeight: text.fontWeight,
                        fontStyle: text.fontStyle,
                        color: text.fontColor,
                        textAlign: text.textAlign
                    }}
                >
                    {text.content}
                </div>
            ))}
        </div>
    );
};

export default Graphic;