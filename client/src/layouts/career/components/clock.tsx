import React, { useState, useEffect } from 'react'
export const Clock = () => {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        requestAnimationFrame(() => {
            setNow(new Date())
        })
    })
    return <span>
        （{`${((now.getTime() - (new Date(2016, 9, 18).getTime())) / 1000 / 24 / 3600).toFixed()}天前至今`}）
    </span>
}