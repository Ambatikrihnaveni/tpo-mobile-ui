import React from 'react'
import {ClipLoader,SyncLoader} from "react-spinners";

export default function AppLoading() {
  return (
    <div>
        <SyncLoader
    color="#17a69c"
    loading={loading}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
    </div>
  )
}
