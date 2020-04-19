import React from 'react';

import { getMode } from '@ionic/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel, IonCheckbox, IonFooter, IonIcon } from '@ionic/react';
import { logoAngular, call, document, logoIonic, hammer, restaurant, cog, colorPalette, construct, compass } from 'ionicons/icons';

import './EvenementListFilter.css'

import { connect } from '../data/connect';
import { updateFilteredTags } from '../data/evenements/evenements.actions';

interface OwnProps {
  onDismissModal: () => void;
}

interface StateProps {
  allTags: string[],
  filteredTags: string[]
}

interface DispatchProps {
  updateFilteredTags: typeof updateFilteredTags;
}

type EvenementListFilterProps = OwnProps & StateProps & DispatchProps;

const EvenementListFilter: React.FC<EvenementListFilterProps> = ({ allTags, filteredTags, onDismissModal, updateFilteredTags }) => {
  const ios = getMode() === 'ios';

  const toggleTrackFilter = (track: string) => {
    if (filteredTags.indexOf(track) > -1) {
      updateFilteredTags(filteredTags.filter(x => x !== track));
    } else {
      updateFilteredTags([...filteredTags, track]);
    }
  };

  const handleDeselectTous = () => {
    updateFilteredTags([]);
  };

  const handleSelectTous = () => {
    updateFilteredTags([...allTags]);
  };

  const iconMap: { [key: string]: any } = {
    'Angular': logoAngular,
    'Documentation': document,
    'Food': restaurant,
    'Ionic': logoIonic,
    'Tooling': hammer,
    'Design': colorPalette,
    'Services': cog,
    'Workshop': construct,
    'Navigation': compass,
    'Communication': call
  }

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            { ios &&
              <IonButton onClick={onDismissModal}>Annuler</IonButton>
            }
            { !ios &&
              <IonButton onClick={handleDeselectTous}>Déselectionner</IonButton>
            }
          </IonButtons>

          <IonTitle>
            Filtrer Evenements
          </IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>OK</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines={ ios ? 'inset' : 'full'}>
          <IonListHeader>Tags</IonListHeader>

          {allTags.map((track, index) => (
            <IonItem key={track}>
              { ios &&
                <IonIcon slot="start" icon={iconMap[track]} color="medium" />
              }
              <IonLabel>{track}</IonLabel>
              <IonCheckbox
                onClick={() => toggleTrackFilter(track)}
                checked={filteredTags.indexOf(track) !== -1}
                color="primary"
                value={track}
              ></IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      { ios &&
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleDeselectTous}>Tout déselectionner</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleSelectTous}>Tout sélectionner</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      }
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    allTags: state.data.allTags,
    filteredTags: state.data.filteredTags
  }),
  mapDispatchToProps: {
    updateFilteredTags
  },
  component: EvenementListFilter
})
