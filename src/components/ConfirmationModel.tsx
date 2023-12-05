import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface ConfirmationModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    loading: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onConfirm, onCancel, loading }) => {
    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Are you sure you want to delete this todo?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity disabled={loading} onPress={onConfirm}>
                            <Text style={styles.confirmText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={loading} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: 300,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    confirmText: {
        color: 'green',
    },
    cancelText: {
        color: 'red',
    },
});

export default ConfirmationModal;
