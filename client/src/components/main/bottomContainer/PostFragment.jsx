import React from 'react';

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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PostFragment;