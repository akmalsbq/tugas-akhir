import Image from "next/image";
import styles from "../styles/Dashboard.module.css";
import logo from "../assets/logo.svg";
import logout from "../assets/logout.svg";
import Link from 'next/link';
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
import { getDatabase, ref, child, get} from 'firebase/database'
import { db } from "../services/firebaseSDK";
import { collection,getDocs } from "firebase/firestore"
import { Bar,Line, Scatter, Bubble } from "react-chartjs-2";
import {useRouter} from 'next/router'
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseSDK"

export default function DashboardHome() {

        //Firebase Realtime Database
        const [snapshot, setSnapshot]= useState(false)
        const error = useRef(null)

        const getValue = async () =>{
            try{
                const realdata = getDatabase(firebaseApp)
                const rootReference = ref(realdata)
                const dbAlt = await get(child(rootReference, 'realtime'))
                const dbValue = dbAlt.val()
                setSnapshot([dbValue]);
                console.log(dbValue)
            } catch (getError){
                error.current = getError.message
            }
        }
        
        const data = Object.values(snapshot)

        useEffect(() => {
           getValue() 
        },[])


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

        //Set user
        
  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>

            <Image src={logo} alt="logo" />
            <h1 className={styles.label}> Menu </h1>
            <Link href="/home">
                <button className={styles.buttonActive}>
                    <Image src={homemain} alt="homemain"/>
                    <h3 className={styles.buttonlabel}>  Dashboard </h3>
                </button>
            </Link>
            <Link href="/gallery">
                <button className={styles.button}>
                    <Image src={dronegray} alt="dronegray"/>
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
            <h3 className={styles.subtitle}> Aktivitas hari ini </h3>
            <Row gutter={24}>
                <Col span={7}>
                    <Card 
                        bordered={false}
                        style={{
                         backgroundColor: '#ffef9f',
                         paddingRight: '0px'
                    }}>
                    <h3 className={styles.cardtitle}> Burung terdeteksi </h3>
                    {data.map((item) => {
                        return(
                            <div key={item.burung}>
                                <h1 className={styles.cardinfo}> {item.burung} Ekor </h1>
                            </div>
                        )
                    })}
                    </Card>
                </Col>
                <Col span={7}>
                    <Card 
                    bordered={false}
                    style={{
                        backgroundColor: '#c1fba4',
                    }}
                    >
                    <h3 className={styles.cardtitle}> Baterai </h3>
                    {data.map((item) => {
                        return(
                            <div key={item.baterai}>
                                <h1 className={styles.cardinfo}> {item.baterai} % </h1>
                            </div>
                        )
                    })}
                    </Card>
                </Col>
                <Col span={7}>
                    <Card 
                        bordered={false}
                        style={{
                            backgroundColor: '#ffd6e0',
                        }}
                    >
                    <h3 className={styles.cardtitle}> Status </h3>
                    {data.map((item) => {
                        return(
                            <div key={item.status}>
                                <h1 className={styles.cardinfo}> {item.status}</h1>
                            </div>
                        )
                    })}
                    </Card>
                </Col>
            </Row>
        </div>
        <h3 className={styles.subtitle}> Baru baru ini </h3>
        <Table
            columns={columns}
            dataSource={fireData}
        />
        </div>

    </div>
  );
}
