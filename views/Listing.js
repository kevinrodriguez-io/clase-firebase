import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { FlatList, StatusBar } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

export const Listing = () => {
  const [books, loading, error] = useCollectionData(
    firestore.collection("libros")
  );

  const addBook = () => {
    firestore.collection("libros").add({
      name: "Homo Deus",
      type: "Best Seller",
    });
  };

  const renameBookById = async (bookId) => {
    await firestore.doc(`libros/${bookId}`).set(
      {
        name: "Life 3.0",
      },
      {
        merge: true,
      }
    );
  };

  const removeBookById = async (idToRemove) => {
    await firestore.doc(`libros/${idToRemove}`).delete();
  };

  const handleAddNewBookPress = () => {
    addBook();
  };

  const handleRemoveBookPress = (idToRemove) => {
    removeBookById(idToRemove);
  };

  const handleChangeBookNamePress = (idToChange) => {
    renameBookById(idToChange);
  };

  return (
    <ListingContainer>
      <HeaderText>Listado de libros</HeaderText>
      <FlatList
        data={books}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <Card>
            <HeaderText>{item.name}</HeaderText>
            <BlackButton onPress={() => handleRemoveBookPress(item.id)}>
              <ButtonText>Borrar</ButtonText>
            </BlackButton>
            <BlackButton onPress={() => handleChangeBookNamePress(item.id)}>
              <ButtonText>Renombrar</ButtonText>
            </BlackButton>
          </Card>
        )}
      />
      <BlackButton onPress={handleAddNewBookPress}>
        <ButtonText>Agregar Nuevo Libro</ButtonText>
      </BlackButton>
    </ListingContainer>
  );
};

const ListingContainer = styled.SafeAreaView({
  flex: 1,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
});

const HeaderText = styled.Text({
  color: "#000",
  fontSize: 20,
});

const Card = styled.View({
  borderWidth: 1,
  borderColor: "#000",
  borderRadius: 5,
});

const BlackButton = styled.TouchableOpacity({
  backgroundColor: "#000",
  padding: 10,
  margin: 10,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
  height: 50,
});

const ButtonText = styled.Text({
  color: "#fff",
  fontSize: 20,
});
