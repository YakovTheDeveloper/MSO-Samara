// src/composables/useDrag.js
import { ref } from 'vue';

export function useDrag() {
    // Reactive state for dragging behavior
    const isDragging = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    const currentX = ref(0);
    const currentY = ref(0);
    const imageStyles = ref({
        position: 'absolute',
        cursor: 'grab',
        top: '0',
        left: '0',
    });

    // Function to start the drag
    const startDrag = (e) => {
        isDragging.value = true;
        startX.value = e.clientX - currentX.value;
        startY.value = e.clientY - currentY.value;
        imageStyles.value.cursor = 'grabbing'; // Change cursor during drag
    };

    // Function to handle the drag
    const dragImage = (e) => {
        if (!isDragging.value) return;

        // Calculate the new position based on mouse movement
        const dx = e.clientX - startX.value;
        const dy = e.clientY - startY.value;

        currentX.value = dx;
        currentY.value = dy;

        // Update the image position
        imageStyles.value = {
            ...imageStyles.value,
            left: `${dx}px`,
            top: `${dy}px`,
        };
    };

    // Function to stop the drag
    const stopDrag = () => {
        isDragging.value = false;
        imageStyles.value.cursor = 'grab'; // Reset cursor after drag
    };

    // Return necessary values and functions to use in the component
    return {
        startDrag,
        dragImage,
        stopDrag,
        imageStyles,
    };
}
