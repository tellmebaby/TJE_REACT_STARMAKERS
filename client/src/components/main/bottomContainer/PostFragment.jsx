import React from 'react';
import './css/PostFragment.css'

const PostFragment = ({ dataList, isLoading }) => {
    return (
        <div>
            <div className='flag-wrap'>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    dataList.map(data => (
                        <div key={data.userNo} className='flag-item'>
                            <img src={`/file/img/${data.imgNo}`} alt="Frag img" className='frag-img' />
                            <div className='DisplayCon'>
                                <div className='DisplayCon-Top'>
                                    <p>{data.type}</p>
                                    <span>{data.views} views</span>
                                </div>
                                <div className='DisplayCon-Bottom'>
                                    <h5>{data.title}</h5>
                                    <div>
                                    {/* <img src={`/file/img/${data.userImgId}`} alt="user img" /> */}
                                    <span>{data.writer}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PostFragment;