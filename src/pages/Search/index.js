import React, {useState} from 'react'
import Image from 'next/image'
import style from './search.module.css'
import { useRouter } from 'next/router'

const Search = () => {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div className={style.container}>
      <div>
        <Image src="/assets/logo-vertical.svg" width="197" height="242" alt="" />
        <div>
          <input type="search" name="" value={name} onChange={handleChange} placeholder="Enter user name" className={style.inputSearch} />
          <button onClick={() => router.push(`/results/${name}`)} type="button" className={style.button}>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search