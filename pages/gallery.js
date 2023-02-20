import Image from "next/image";
import styles from "../styles/Dashboard.module.css";
import logo from "../assets/logo.svg";
import logout from "../assets/logout.svg";
import Link from 'next/link';
import homegray from "../assets/homegray.svg";
import homemain from "../assets/homemain.svg";
import calgray from "../assets/calgray.svg";
import dronegray from "../assets/dronegray.svg";
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Table } from 'antd';
import { columns, data } from "../services/Table";
import { Card, Col, Row, Statistic } from 'antd';
import { ClockCircleFilled, SoundFilled } from '@ant-design/icons';
import user from "../assets/user.svg";
import firebaseApp from "../services/firebaseSDK";
import { db } from "../services/firebaseSDK";
import { collection,getDocs } from "firebase/firestore"
import { Bar,Line, Scatter, Bubble } from "react-chartjs-2";
import {useRouter} from 'next/router'
import droneblue from "../assets/droneblue.svg";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseSDK"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebaseSDK";

export default function DashboardHome() {

        //Firestore
        const [fireData, setFireData] = useState([]);
        const getData = async () =>{
            const databaseRef = await getDocs (collection(db, 'droneResult'))
            .then((response) =>{
                setFireData(response.docs.map((data) =>{
                    return {...data.data(), id:data.id}
                }))
            })
        }
        useEffect(()=>{
            getData()
        },[])

        const router = useRouter();
        const logexit = async () =>{
            router.push('/login')
        }

        //Storage
        const [imageUrl, setImageUrl] = useState("");

        useEffect(() => {
          const imageRef = ref(storage, "GIFTBOX_00000.png");
          getDownloadURL(imageRef)
            .then((url) => {
              setImageUrl(url);
            })
            .catch((error) => {
              console.error(error);
            });
        }, []);


  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>

            <Image src={logo} alt="logo" />
            <h1 className={styles.label}> Menu </h1>
            <Link href="/home">
                <button className={styles.button}>
                    <Image src={homegray} alt="homegray"/>
                    <h3 className={styles.buttonlabel}>  Dashboard </h3>
                </button>
            </Link>
            <Link href="/gallery">
                <button className={styles.buttonActive}>
                    <Image src={droneblue} alt="droneblue"/>
                    <h3 className={styles.buttonlabel}>  Gallery </h3>
                </button>
            </Link>
            <div className={styles.account}>
                <div className={styles.logindex}>
                    <Image src={user} alt="user"/>
                    <p className={styles.caption}>Anda masuk sebagai</p>
                </div>
                <h3 className={styles.emailuser}>
                </h3>
            </div>
            <button className={styles.buttonLogout} onClick={logexit} type="primary" >
                <Image src={logout} alt="logout"/>
                <h3 className={styles.buttonlabel}> Keluar akun </h3>
            </button>

        </div>
        <div className={styles.section}>
        <div className="site-card-wrapper">
        <h3 className={styles.subtitle}> Gallery pantauan </h3>
        <div>
            <Row gutter={24}>
                <Col span={7}>
                    <img 
                        src={imageUrl} 
                        alt="Gambar"
                        width={200}
                        height={200}
                    />
                </Col>
                <Col span={7}>
                    <img 
                        src={imageUrl} 
                        alt="Gambar"
                        width={200}
                        height={200}
                    />
                </Col>
                <Col span={7}>
                    <img 
                        src={imageUrl} 
                        alt="Gambar"
                        width={200}
                        height={200}
                    />
                </Col>
                <Col span={7}>
                    <img 
                        src={imageUrl} 
                        alt="Gambar"
                        width={200}
                        height={200}
                    />
                </Col>
            </Row>
        </div>
        </div>
        </div>

    </div>
  );
}
