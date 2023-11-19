import { View, FlatList, StyleSheet, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { app_db } from "../../../firebaseConfig";
import { collection, onSnapshot} from 'firebase/firestore';

import { OnboardingItem } from "../onboardingitem";

export function Onboarding(){
    const [ features, setFeatures ] = useState('')
    const scrollX = useRef( new Animated.Value(0) ).current;

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
    
    },[features])

    return(
        <View style={styles.container} >
            <FlatList
                data={ features }
                renderItem={ ({ item }) => <OnboardingItem data={item}/> }
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                bounces={ false }
                onScroll={ Animated.event([{ nativeEvent : { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false
                } ) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})