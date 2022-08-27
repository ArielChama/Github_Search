import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from './results.module.css'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { faFileCode } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

function Name() {
  const router = useRouter()
  const { name } = router.query

  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState(null)

  const fetchAllData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${name}`)
      const user = await response.json()

      const responseRepos = await fetch(`https://api.github.com/users/${name}/repos`)
      const repos = await responseRepos.json()

      if (!user || !repos)
        throw 'Problema na requisição'

      setUser(user)
      setRepos(repos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])


  if (user && repos)
    return (
      <>
        <main className={style.container}>
          <div className={style.containerSecond}>
            <header>
              <nav className={style.menu}>
                <Image src="/assets/logo-horizontal.svg" width="169" height="58" alt="Logo horizontal" />
                <Link href="/">
                  <FontAwesomeIcon icon={faArrowLeft} fontSize="30px" color="#B2B2B2" />
                </Link>
              </nav>
            </header>

            <section>
              <div className={style.content}>
                <div className={style.profileHead}>
                  <div className={style.profileImage}>
                    <img src={user.avatar_url} alt={`Imagem de perfil de ${user.name}`} />
                  </div>

                  <div className={style.profileInfo}>
                    <h1>{user.name}</h1>
                    <p>@{user.login}</p>
                    <div className={style.profileInfoBottom}>
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} color="#8752CC" /> {user.location} <FontAwesomeIcon icon={faBriefcase} color="#8752CC" /> @{user.company}
                      </p>

                      <p>
                        <FontAwesomeIcon icon={faPeopleGroup} color="#8752CC" /> {user.followers} <FontAwesomeIcon icon={faPeopleGroup} color="#8752CC" /> {user.following} <FontAwesomeIcon icon={faStar} color="#8752CC" /> 30
                      </p>
                    </div>
                  </div>

                  <div className={style.profileCard}>
                    <p>Total Repositories</p>
                    <p className={style.countRepo}><FontAwesomeIcon icon={faCodeBranch} color="#8752CC" /> 29</p>
                  </div>
                </div>

                <div className={style.contentBody}>
                  {repos.map((repo) => (
                    <div key={repo.id} className={style.cardRepo}>
                      <h3>{repo.name}</h3>
                      <p>
                        {repo.description}
                      </p>

                      <div className={style.cardRepoBottom}>
                        <div>
                          <FontAwesomeIcon icon={faStar} color="#8752CC" /> {repo.stargazers_count}
                        </div>

                        <div>
                          <FontAwesomeIcon icon={faCodeBranch} color="#8752CC" /> {repo.forks}
                        </div>

                        <div>
                          <FontAwesomeIcon icon={faFileCode} color="#8752CC" /> {repo.language}
                        </div>

                        <div>
                          <a href={repo.html_url}>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} color="#8752CC" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </>
    )
}

export default Name