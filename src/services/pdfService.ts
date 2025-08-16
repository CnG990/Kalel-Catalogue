import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class PDFService {
  static async generateCataloguePDF(): Promise<void> {
    try {
      // Créer un nouveau document PDF avec support UTF-8
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 25;
      const contentWidth = pageWidth - (2 * margin);
      
      let yPosition = margin;
      
      // En-tête avec logo et titre
      yPosition = await this.addHeader(pdf, yPosition, pageWidth, margin);
      
      // Section Fonctionnalités principales
      yPosition = this.addSectionTitle(pdf, 'Fonctionnalites principales', yPosition, pageWidth);
      
      const features = [
        { title: 'Reservation en ligne', desc: 'Systeme de reservation 24/7 avec calendrier interactif et confirmation instantanee' },
        { title: 'Paiement securise', desc: 'Integration de multiples moyens de paiement avec securite bancaire' },
        { title: 'Application mobile', desc: 'Interface responsive adaptee a tous les appareils mobiles' },
        { title: 'Gestion des utilisateurs', desc: 'Systeme de roles et permissions pour administrateurs et gestionnaires' },
        { title: 'Geolocalisation', desc: 'Cartographie interactive des terrains avec recherche par proximite' },
        { title: 'Securite avancee', desc: 'Authentification JWT et protection des donnees sensibles' },
        { title: 'QR Code et tickets', desc: 'Generation automatique de QR codes et tickets numeriques pour validation' },
        { title: 'Notifications multi-canal', desc: 'Notifications par email, SMS, push et WebSocket en temps reel' },
        { title: 'Abonnements flexibles', desc: 'Systeme d\'abonnements avec preferences de creneaux et reductions' },
        { title: 'Options terrain avancees', desc: 'Configuration d\'options terrain avec contraintes et capacites' },
        { title: 'Validation de tickets', desc: 'Scanner QR code et validation par code pour les gestionnaires' },
        { title: 'Historique complet', desc: 'Suivi des reservations, paiements et activites utilisateur' }
      ];
      
      yPosition = this.addFeatureCards(pdf, features, yPosition, contentWidth, margin);
      
      // Vérifier si on a assez d'espace pour les avantages
      if (yPosition > pageHeight - 140) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Section Avantages
      yPosition = this.addSectionTitle(pdf, 'Avantages pour votre entreprise', yPosition, pageWidth);
      
      // Avantages pour les gestionnaires
      yPosition = this.addBenefitSection(pdf, 'Pour les gestionnaires de terrains', [
        'Automatisation complete des reservations',
        'Gestion des abonnements et tarifs',
        'Tableaux de bord analytiques',
        'Communication avec les clients',
        'Gestion des litiges et tickets',
        'Validation QR code et tickets numeriques',
        'Notifications automatiques aux clients',
        'Gestion des options terrain et contraintes',
        'Suivi des paiements et remboursements',
        'Historique complet des activites'
      ], yPosition, margin);
      
      yPosition += 25; // Plus d'espace entre les sections
      
      // Vérifier si on a assez d'espace pour les avantages joueurs
      if (yPosition > pageHeight - 120) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Avantages pour les joueurs
      yPosition = this.addBenefitSection(pdf, 'Pour les joueurs', [
        'Reservation simple et rapide',
        'Paiement securise en ligne',
        'Historique des reservations',
        'Notifications en temps reel',
        'Support client integre',
        'Tickets QR code numeriques',
        'Abonnements avec reductions',
        'Options terrain personnalisees',
        'Rappels automatiques de matchs',
        'Paiement par Mobile Money (Orange, Wave)'
      ], yPosition, margin);
      
      // Nouvelle page pour les moyens de paiement
      pdf.addPage();
      yPosition = margin;
      
      // Section Moyens de paiement
      yPosition = this.addSectionTitle(pdf, 'Moyens de paiement acceptes', yPosition, pageWidth);
      
      const paymentMethods = [
        { title: 'Mobile Money', desc: 'Orange Money, Wave, Free Money' },
        { title: 'Cartes bancaires', desc: 'Visa, Mastercard, cartes locales' },
        { title: 'Especes', desc: 'Paiement sur place au terrain' }
      ];
      
      yPosition = this.addPaymentMethodsCards(pdf, paymentMethods, yPosition, contentWidth, margin);
      
      // Nouvelle page pour les spécifications techniques
      pdf.addPage();
      yPosition = margin;
      
      // Section Spécifications techniques
      yPosition = this.addSectionTitle(pdf, 'Specifications techniques', yPosition, pageWidth);
      
      const techSpecs = [
        { title: 'Frontend', tech: 'React + TypeScript', desc: 'Interface moderne et responsive' },
        { title: 'Backend', tech: 'Laravel + PHP', desc: 'API robuste et securisee' },
        { title: 'Base de donnees', tech: 'PostgreSQL + PostGIS', desc: 'Donnees geospatiales avancees' },
        { title: 'Authentification', tech: 'JWT + Sanctum', desc: 'Securite renforcee et sessions' },
        { title: 'Notifications', tech: 'Email + SMS + Push', desc: 'Multi-canal temps reel' },
        { title: 'Paiements', tech: 'Mobile Money + Cartes', desc: 'Integration securisee' }
      ];
      
      yPosition = this.addTechSpecsCards(pdf, techSpecs, yPosition, contentWidth, margin);
      
      // Nouvelle page pour le contact
      pdf.addPage();
      yPosition = margin;
      
      // Section Contact
      yPosition = this.addSectionTitle(pdf, 'Contact et support', yPosition, pageWidth);
      
      yPosition = this.addContactSection(pdf, yPosition, margin);
      
      // Pied de page
      this.addFooter(pdf, pageWidth, pageHeight);
      
      // Sauvegarder le PDF
      pdf.save('Kalel-Sa-Match-Catalogue-2024.pdf');
      
    } catch (error) {
      console.error('Erreur lors de la generation du PDF:', error);
      throw error;
    }
  }
  
  private static async addHeader(pdf: jsPDF, yPosition: number, pageWidth: number, margin: number): Promise<number> {
    // Fond orange pour l'en-tête - augmenter la hauteur
    pdf.setFillColor(255, 140, 0);
    pdf.rect(0, 0, pageWidth, 85, 'F'); // Augmenter de 70 à 85
    
    // Logo
    const logoSize = 50;
    const logoX = margin;
    const logoY = 10;
    
    try {
      // Essayer d'abord le logo sans background
      const logoUrl = '/logo sans background.png';
      const logoImage = new Image();
      
      // Créer un canvas temporaire pour charger l'image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Attendre que l'image se charge
        await new Promise((resolve, reject) => {
          logoImage.onload = resolve;
          logoImage.onerror = reject;
          logoImage.src = logoUrl;
        });
        
        // Utiliser la taille originale de l'image pour éviter la pixelisation
        const originalWidth = logoImage.width;
        const originalHeight = logoImage.height;
        
        // Calculer les dimensions finales en gardant les proportions
        const aspectRatio = originalWidth / originalHeight;
        let finalWidth = logoSize;
        let finalHeight = logoSize;
        
        if (aspectRatio > 1) {
          // Image plus large que haute
          finalHeight = logoSize / aspectRatio;
        } else {
          // Image plus haute que large
          finalWidth = logoSize * aspectRatio;
        }
        
        // Créer un canvas avec la résolution originale de l'image
        canvas.width = originalWidth;
        canvas.height = originalHeight;
        
        // Configurer le contexte pour une meilleure qualité
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Dessiner l'image à sa taille originale
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(logoImage, 0, 0, originalWidth, originalHeight);
        
        // Convertir en base64 avec qualité maximale
        const logoDataUrl = canvas.toDataURL('image/png', 1.0);
        
        // Ajouter l'image au PDF avec les dimensions finales
        pdf.addImage(logoDataUrl, 'PNG', logoX, logoY, finalWidth, finalHeight);
      }
    } catch (error) {
      console.warn('Impossible de charger le logo sans background, tentative avec le logo normal:', error);
      
      try {
        // Essayer avec le logo normal comme fallback
        const logoUrl = '/logo.png';
        const logoImage = new Image();
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          await new Promise((resolve, reject) => {
            logoImage.onload = resolve;
            logoImage.onerror = reject;
            logoImage.src = logoUrl;
          });
          
          // Utiliser la taille originale de l'image
          const originalWidth = logoImage.width;
          const originalHeight = logoImage.height;
          
          // Calculer les dimensions finales
          const aspectRatio = originalWidth / originalHeight;
          let finalWidth = logoSize;
          let finalHeight = logoSize;
          
          if (aspectRatio > 1) {
            finalHeight = logoSize / aspectRatio;
          } else {
            finalWidth = logoSize * aspectRatio;
          }
          
          // Créer un canvas avec la résolution originale
          canvas.width = originalWidth;
          canvas.height = originalHeight;
          
          // Configurer le contexte pour une meilleure qualité
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(logoImage, 0, 0, originalWidth, originalHeight);
          
          const logoDataUrl = canvas.toDataURL('image/png', 1.0);
          pdf.addImage(logoDataUrl, 'PNG', logoX, logoY, finalWidth, finalHeight);
        }
      } catch (secondError) {
        console.warn('Impossible de charger le logo normal, utilisation d\'un placeholder:', secondError);
        
        // Fallback final: rectangle blanc avec bordure orange et texte stylisé
        pdf.setFillColor(255, 255, 255);
        pdf.rect(logoX, logoY, logoSize, logoSize, 'F');
        pdf.setDrawColor(255, 140, 0);
        pdf.setLineWidth(3);
        pdf.rect(logoX, logoY, logoSize, logoSize, 'D');
        
        // Texte stylisé "KALEL SA MATCH" dans le rectangle
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(255, 140, 0);
        pdf.text('KALEL', logoX + logoSize/2, logoY + logoSize/2 - 8, { align: 'center' });
        pdf.text('SA', logoX + logoSize/2, logoY + logoSize/2, { align: 'center' });
        pdf.text('MATCH', logoX + logoSize/2, logoY + logoSize/2 + 8, { align: 'center' });
      }
    }
    
    // Titre principal
    pdf.setFontSize(28); // Réduire la taille de 32 à 28
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('Kalel Sa Match', logoX + logoSize + 30, logoY + 25);
    
    // Sous-titre - diviser en plusieurs lignes et ajuster la position
    pdf.setFontSize(14); // Réduire la taille de 16 à 14
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(255, 255, 255);
    pdf.text('Solution complete de gestion et', logoX + logoSize + 30, logoY + 42); // Ajuster la position
    pdf.text('reservation de terrains de football', logoX + logoSize + 30, logoY + 52); // Ajuster la position
    pdf.text('synthetiques', logoX + logoSize + 30, logoY + 62); // Ajuster la position
    
    return 105; // Retourner la position Y après l'en-tête agrandi
  }
  
  private static addSectionTitle(pdf: jsPDF, title: string, yPosition: number, pageWidth: number): number {
    // Ligne décorative orange
    pdf.setDrawColor(255, 140, 0);
    pdf.setLineWidth(4);
    pdf.line(pageWidth/2 - 40, yPosition - 8, pageWidth/2 + 40, yPosition - 8);
    
    // Titre
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 140, 0);
    pdf.text(title, pageWidth / 2, yPosition, { align: 'center' });
    
    return yPosition + 25;
  }
  
  private static addFeatureCards(pdf: jsPDF, features: Array<{title: string, desc: string}>, yPosition: number, contentWidth: number, margin: number): number {
    const cardHeight = 50; // Augmenter encore plus la hauteur des cartes
    const cardsPerRow = 2;
    const cardWidth = (contentWidth - 15) / cardsPerRow;
    
    features.forEach((feature, index) => {
      const row = Math.floor(index / cardsPerRow);
      const col = index % cardsPerRow;
      const x = margin + (col * (cardWidth + 15));
      const y = yPosition + (row * (cardHeight + 15));
      
      // Fond de la carte avec bordure orange
      pdf.setFillColor(248, 250, 252);
      pdf.rect(x, y, cardWidth, cardHeight, 'F');
      pdf.setDrawColor(255, 140, 0);
      pdf.setLineWidth(2);
      pdf.rect(x, y, cardWidth, cardHeight, 'D');
      
      // Titre en orange
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 140, 0);
      pdf.text(feature.title, x + 8, y + 12);
      
      // Description en gris - diviser en plusieurs lignes si nécessaire
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      const lines = pdf.splitTextToSize(feature.desc, cardWidth - 16);
      lines.forEach((line, lineIndex) => {
        if (lineIndex < 3) { // Limiter à 3 lignes
          pdf.text(line, x + 8, y + 25 + (lineIndex * 6));
        }
      });
    });
    
    const totalRows = Math.ceil(features.length / cardsPerRow);
    return yPosition + (totalRows * (cardHeight + 15)) + 30; // Plus d'espace après les cartes
  }
  
  private static addBenefitSection(pdf: jsPDF, title: string, benefits: string[], yPosition: number, margin: number): number {
    // Titre de la section
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(title + ':', margin, yPosition);
    yPosition += 18; // Plus d'espace après le titre
    
    // Liste des avantages
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    
    benefits.forEach(benefit => {
      // Puce orange
      pdf.setFillColor(255, 140, 0);
      pdf.circle(margin + 4, yPosition - 3, 2, 'F');
      
      pdf.text(benefit, margin + 12, yPosition);
      yPosition += 12; // Plus d'espace entre les éléments
    });
    
    return yPosition + 15; // Espace supplémentaire après la section
  }
  
  private static addPaymentMethodsCards(pdf: jsPDF, methods: Array<{title: string, desc: string}>, yPosition: number, contentWidth: number, margin: number): number {
    const cardHeight = 50; // Augmenter encore plus la hauteur des cartes
    const cardsPerRow = 2;
    const cardWidth = (contentWidth - 15) / cardsPerRow;
    
    methods.forEach((method, index) => {
      const row = Math.floor(index / cardsPerRow);
      const col = index % cardsPerRow;
      const x = margin + (col * (cardWidth + 15));
      const y = yPosition + (row * (cardHeight + 15));
      
      // Fond de la carte avec bordure orange
      pdf.setFillColor(248, 250, 252);
      pdf.rect(x, y, cardWidth, cardHeight, 'F');
      pdf.setDrawColor(255, 140, 0);
      pdf.setLineWidth(2);
      pdf.rect(x, y, cardWidth, cardHeight, 'D');
      
      // Titre en orange
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 140, 0);
      pdf.text(method.title, x + 8, y + 12);
      
      // Description en gris - diviser en plusieurs lignes si nécessaire
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      const lines = pdf.splitTextToSize(method.desc, cardWidth - 16);
      lines.forEach((line, lineIndex) => {
        if (lineIndex < 3) { // Limiter à 3 lignes
          pdf.text(line, x + 8, y + 25 + (lineIndex * 6));
        }
      });
    });
    
    const totalRows = Math.ceil(methods.length / cardsPerRow);
    return yPosition + (totalRows * (cardHeight + 15)) + 30; // Plus d'espace après les cartes
  }
  
  private static addTechSpecsCards(pdf: jsPDF, specs: Array<{title: string, tech: string, desc: string}>, yPosition: number, contentWidth: number, margin: number): number {
    const cardHeight = 70; // Augmenter la hauteur de 60 à 70 pour accommoder le texte divisé
    const cardWidth = (contentWidth - 20) / 3;
    
    specs.forEach((spec, index) => {
      const x = margin + (index % 3 * (cardWidth + 10));
      const y = yPosition + (Math.floor(index / 3) * (cardHeight + 15));
      
      // Fond orange de la carte
      pdf.setFillColor(255, 140, 0);
      pdf.rect(x, y, cardWidth, cardHeight, 'F');
      
      // Titre en blanc
      pdf.setFontSize(15);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text(spec.title, x + cardWidth/2, y + 12, { align: 'center' });
      
      // Technologie en blanc - diviser en plusieurs lignes si nécessaire
      pdf.setFontSize(12); // Réduire la taille de 13 à 12
      pdf.setFont('helvetica', 'bold');
      const techLines = pdf.splitTextToSize(spec.tech, cardWidth - 10);
      techLines.forEach((line, lineIndex) => {
        if (lineIndex < 2) { // Limiter à 2 lignes
          pdf.text(line, x + cardWidth/2, y + 25 + (lineIndex * 6), { align: 'center' });
        }
      });
      
      // Description en blanc - diviser en plusieurs lignes si nécessaire
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const lines = pdf.splitTextToSize(spec.desc, cardWidth - 10);
      lines.forEach((line, lineIndex) => {
        if (lineIndex < 2) { // Limiter à 2 lignes
          pdf.text(line, x + cardWidth/2, y + 45 + (lineIndex * 6), { align: 'center' }); // Ajuster la position de 38 à 45
        }
      });
    });
    
    const totalRows = Math.ceil(specs.length / 3);
    return yPosition + (totalRows * (cardHeight + 15)) + 25;
  }
  
  private static addContactSection(pdf: jsPDF, yPosition: number, margin: number): number {
    // Fond pour la section contact
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, yPosition, 170, 70, 'F');
    pdf.setDrawColor(255, 140, 0);
    pdf.setLineWidth(2);
    pdf.rect(margin, yPosition, 170, 70, 'D');
    
    // Titre de la section
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 140, 0);
    pdf.text('Informations de contact', margin + 15, yPosition + 18);
    
    // Contact details (sans emojis pour éviter les problèmes d'encodage)
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    
    pdf.text('WhatsApp: +221 78 594 92 74', margin + 15, yPosition + 35);
    pdf.text('Email: cheikhngom99@gmail.com', margin + 15, yPosition + 45);
    pdf.text('Site web: https://kalel-sa-match.com', margin + 15, yPosition + 55);
    
    return yPosition + 85;
  }
  
  private static addFooter(pdf: jsPDF, pageWidth: number, pageHeight: number): void {
    // Ligne de séparation orange
    pdf.setDrawColor(255, 140, 0);
    pdf.setLineWidth(2);
    pdf.line(25, pageHeight - 35, pageWidth - 25, pageHeight - 35);
    
    // Pied de page - supprimer la ligne de date qui déborde
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Kalel Sa Match - Solution de gestion de terrains de football', pageWidth / 2, pageHeight - 15, { align: 'center' });
  }
}

