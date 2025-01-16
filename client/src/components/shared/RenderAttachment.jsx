import React from 'react'
import { transformImage } from '../../libs/features';

const RenderAttachment = (file, url) => {
    switch (file) {
        case 'video':
            return <video src={url} preload='none' width={'200px'} controls />
        
        case 'image':
            return <img src={transformImage(url,200)} alt='attachment' width={'200px'} height={'200px'} style={{objectFit:'contain'}} />
        
        case 'audio':
            return <audio src={url} preload='none' controls />
        
        default:
            return <div>helo</div>
    }
}

export default RenderAttachment