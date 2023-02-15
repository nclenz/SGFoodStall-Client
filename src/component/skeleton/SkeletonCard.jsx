import Skeleton from "./Skeleton"

import React from "react"

const SkeletonCard = () => {
  return (
    <div className="card">
      <Skeleton classes="title width-50" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
    </div>
  )
}

export default SkeletonCard
