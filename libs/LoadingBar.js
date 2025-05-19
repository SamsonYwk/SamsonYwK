class LoadingBar {
    constructor(options) {
        this.domElement = document.createElement("div");
        this.domElement.style.position = 'fixed';
        this.domElement.style.top = '0';
        this.domElement.style.left = '0';
        this.domElement.style.width = '100%';
        this.domElement.style.height = '100%';
        this.domElement.style.background = '#000';
        this.domElement.style.opacity = '0.7';
        this.domElement.style.display = 'flex';
        this.domElement.style.alignItems = 'center';
        this.domElement.style.justifyContent = 'center';
        this.domElement.style.zIndex = '1111';

        // Container for loading bar and percentage
        const container = document.createElement("div");
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.gap = '10px';

        // Loading bar base
        const barBase = document.createElement("div");
        barBase.style.background = '#aaa';
        barBase.style.width = '50%';
        barBase.style.minWidth = '250px';
        barBase.style.borderRadius = '10px';
        barBase.style.height = '15px';
        barBase.style.overflow = 'hidden';

        // Progress bar (slider)
        const bar = document.createElement("div");
        bar.style.background = '#22a';
        bar.style.width = '0';
        bar.style.borderRadius = '10px';
        bar.style.height = '100%';
        bar.style.transition = 'width 0.3s ease-in-out';
        barBase.appendChild(bar);
        this.progressBar = bar;

        // Percentage display
        const percentageText = document.createElement("div");
        percentageText.style.color = '#fff';
        percentageText.style.fontSize = '18px';
        percentageText.style.fontFamily = 'Arial, sans-serif';
        percentageText.style.textAlign = 'center';
        percentageText.innerText = '0%';
        this.percentageText = percentageText;

        container.appendChild(barBase);
        container.appendChild(percentageText);
        this.domElement.appendChild(container);

        document.body.appendChild(this.domElement);

        // Remove unused onprogress function from original code
    }

    set progress(delta) {
        const percent = Math.min(Math.max(delta * 100, 0), 100).toFixed(0);
        this.progressBar.style.width = `${percent}%`;
        this.percentageText.innerText = `${percent}%`;
    }

    set visible(value) {
        this.domElement.style.display = value ? 'flex' : 'none';
    }
}

export { LoadingBar };