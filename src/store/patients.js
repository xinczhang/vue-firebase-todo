import { firestore } from "@/firebase";
import {
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";

export default {
  state: {
    patientList: null,
    currentPatient: null,
  },
  mutations: {
    fetchPatientList(state, patientList) {
      state.patientList = patientList;
    },
    fetchCurrentPatient(state, currentPatient) {
      state.currentPatient = currentPatient;
    },
  },
  actions: {
    async fetchPatientList({ commit, rootState }) {
      const userUid = rootState.auth.user.uid;
      let patientArray = [];

      const queryRef = query(
        collection(getFirestore(), "patients"),
        where("doctor_uid", "==", userUid)
      );

      await firestore
        .getDocs(queryRef)
        .then((response) => {
          response.forEach((element) => {
            const elementData = element.data();
            elementData.id = element.id;
            patientArray.push(elementData);
          });
          commit("fetchPatientList", patientArray);
        })
        .catch(() => {
          throw Error("Error due fetch patient list.");
        });
    },

    async changeCurrent({ commit }, { id, currentCheckState }) {
      if (!currentCheckState) {
        const patientRef = doc(getFirestore(), "patients", id);
        const patientSnap = await getDoc(patientRef);
        const currentPatient = patientSnap.data();
        currentPatient.id = id;
        const queryRef = query(
          collection(getFirestore(), "reports"),
          where("uid", "==", currentPatient.uid)
        );
        let reportArray = [];
        await firestore
          .getDocs(queryRef)
          .then((response) => {
            response.forEach((element) => {
              const elementData = element.data();
              elementData.id = element.id;
              reportArray.push(elementData);
            });
            currentPatient.reports = reportArray;
            commit("fetchCurrentPatient", currentPatient);
          })
          .catch(() => {
            throw Error("Error due fetch current patient.");
          });
      }
    },
  },
};
