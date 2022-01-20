import React from 'react'

export default function Balance () {
    return (
        <div className="card balance-panel panel text-white">
            <h4>
                Balance
            </h4>
            <h6 className="ml-5 mt-12 mb-4 text-royal-blue-dark font-medium text-5xl">
                <span>
                    0
                </span>
            </h6>
            <svg className="w-10 h-10 ml-5 p-1.5 bg-golden-yellow fill-current rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.39 1.4-4.46 3.43-5.42.34-.16.57-.47.57-.84v-.19c0-.68-.71-1.11-1.32-.82C2.92 5.99 1 8.77 1 12s1.92 6.01 4.68 7.27c.61.28 1.32-.14 1.32-.82v-.18c0-.37-.23-.69-.57-.85C4.4 16.46 3 14.39 3 12z"/></svg>
        </div>
    )
}
