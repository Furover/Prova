import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect, useRef } from "react";
import { app_db } from "../../../firebaseConfig";
import { collection, onSnapshot} from 'firebase/firestore';

import { OnboardingItem } from "../onboardingitem";

export function Onboarding(){
    const carouselRef = useRef(null)
    const [ features, setFeatures ] = useState([])
    const [ active, setActive ] = useState(0)
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const [ imageHeight, setImageHeight ] = useState(0)

    const getItem = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    });

    useEffect(() => {
        if(screenHeight >= 650 && screenHeight <= 750 && screenWidth >= 400 && screenWidth <= 600 ){
            setImageHeight(screenHeight / 3)
        } else if(screenHeight <= 640 && screenWidth <= 360){
            setImageHeight(screenHeight / 3.3)
        } else {
            setImageHeight(screenHeight / 4)
            console.log("bigger display: ",screenHeight, screenWidth)
        }
    })

    useEffect(() => {
        let interval = setInterval(() => {
            if(active >= features.length - 1.1){
                carouselRef.current.scrollToIndex({
                    index: 0,
                    animation: true
                });
            } else {
                carouselRef.current.scrollToIndex({
                    index: active + 1,
                    animation: true
                });
            }
        }, 3500)

        return () => clearInterval( interval )
    });

    const renderDots = () => {
            if(features != []){
                return features.map((dot, index) => {

                    if((active - 0.2) <= index && index != 1){
                        return(
                            <View style={styles.dotactive} key={index} />
                        )
                    } else if(active >= (index - 0.2) && index != 0){
                        return(
                            <View style={styles.dotactive} key={index} />
                        )
                    } else {
                        return(
                            <View style={styles.dot} key={index} />
                        )
                    }
                })
            }
        
    };
    const handleScroll = ( event ) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;

        const index = scrollPosition / screenWidth;
        setActive(index)
    };

    useEffect(()=>{
        const featuredRef = collection( app_db, 'Featured' )
    
        const subscriver = onSnapshot(featuredRef, {
            next : (snapshot) => {
                const featuresq = []
                snapshot.docs.forEach(doc =>{
       
                    featuresq.push({
                        key : doc.id,
                        ...doc.data()
                    })
                })
                setFeatures( featuresq )
    
    
            }
        })
    
        return() => subscriver()
    
    },[]);

    return(
        <View style={[{ width: screenWidth, height: imageHeight }]} >
                <FlatList
                    data={ features }
                    ref={carouselRef}
                    getItemLayout={getItem}
                    renderItem={ ({ item }) => <OnboardingItem data={item}/> }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={handleScroll}
                />
                <View style={styles.dotarea} >
                    {renderDots()}
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%", height: "52.5%",
    },
    dot:{
        height: 10,
        width: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: 5,
        marginHorizontal: 10
    },
    dotactive:{
        height: 10,
        width: 10,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: 5,
        marginHorizontal: 10
    },
    dotarea:{
        position: 'absolute', 
        flexDirection: 'row', 
        width: "100%", 
        height: "100%", 
        justifyContent: 'center', 
        alignItems: 'flex-end',
        paddingBottom: 15
    }
})