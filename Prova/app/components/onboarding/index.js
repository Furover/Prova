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
        if(screenHeight >= 650 && screenHeight <= 730 && screenWidth >= 400 && screenWidth <= 550 ){
            // 683 411 pixel 2a
            setImageHeight(screenHeight / 3)
            console.log("medium display: ",screenHeight, screenWidth)
        } else if(screenHeight == 640 && screenWidth == 360){
            // 640 360 asus zenfone 3 and xiaomi mi a1, which is 1/3 of 1920x1080
            setImageHeight(screenHeight / 3.2)
        } else if(screenHeight < 640 && screenWidth < 360){
            setImageHeight(screenHeight / 3)
            console.log("small display: ",screenHeight, screenWidth)
        } else if(screenHeight >= 765 && screenWidth >= 300 && screenWidth <= 500) {
            //890 411 pixel 7, 770 360 galaxy s20
            setImageHeight(screenHeight / 3.9)
        } else if(screenHeight >= 800 && screenWidth >= 510 ) {
            setImageHeight(screenHeight / 4.5)
            console.log("weird display: ",screenHeight, screenWidth)
        } else {
            setImageHeight(200)
            console.log("weirdest display: ",screenHeight, screenWidth)
        }
    })

    useEffect(() => {
        let interval = setInterval(() => {
            try{
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
            }} catch(error){
                
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

        console.log("pedi imagem")
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