import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import MainCanvas from "../../components/Three/Canvas"
import client from "../../client"
import styles from "../../styles/home.module.scss"
import { useContext } from "react"
import { SmoothScrollContext } from "../../contexts/SmoothScroll.context"

const Layout = props => {
    const bodyRef = useRef()
    const router = useRouter()
    const [scrollCtx, setScrollCtx] = useState()

    const { scroll } = useContext(SmoothScrollContext)

    useEffect(() => {
        setScrollCtx(scroll)
    }, [scroll])

    const date = new Date()
    const year = date.getFullYear()

    return (
        <>
            <Head>
                <title>CADILLAC</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id="left"></div>
            <div id="right"></div>
            <div id="top"></div>
            <div id="bottom"></div>
            <div id="viewport">
                <div
                    ref={bodyRef}
                    data-scroll-container
                    className={styles.container}
                >
                    <div className={styles.navContainer} data-scroll-section>
                        {/* <div className={styles.logo}></div> */}
                        <div data-scroll className={styles.nav}>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                            <Link href="/news">
                                <a>News</a>
                            </Link>
                            <Link href="/bio">
                                <a>Bio</a>
                            </Link>
                            <Link href="#">
                                <a>Shop</a>
                            </Link>
                        </div>
                    </div>
                    <MainCanvas
                        bodyRef={bodyRef}
                        bioRef={props.bioRef}
                        newsRef={props.newsRef}
                        showsRef={props.showsRef}
                        route={props.route}
                        scroll={scrollCtx}
                    />
                    <main data-scroll-section className={styles.main}>
                        {props.children}
                    </main>
                    <footer data-scroll-section>
                        <Image src="/svg/logo.svg" width={210} height={43} />
                        <div className={styles.footerSocial}>
                            <a
                                href="https://instagram.com/cadillac_ftw"
                                target="_blank"
                            >
                                <Image
                                    src="/svg/instagram.svg"
                                    width={30}
                                    height={30}
                                />
                            </a>
                        </div>
                        <span className={styles.copyright}>
                            ©{year} Cadillac. All Rights Reserved.
                        </span>
                    </footer>
                </div>
            </div>
        </>
    )
}

Layout.getInitialProps = async function (context) {
    const { show = "" } = context.query
    return await client.fetch(
        `
    *[_type == "show"] | order(date){date, venue, city}
  `,
        { show }
    )
}

const mapStateToProps = state => {
    return {
        bioRef: state.bioRef,
        route: state.route,
        newsRef: state.newsRef,
        showsRef: state.showsRef,
    }
}

export default connect(mapStateToProps)(Layout)
