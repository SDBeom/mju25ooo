import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 사용자가 제공한 Figma URL들
const figmaUrls = `
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=365-711&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-14767&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=365-1085&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17696&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=346-6128&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=346-6063&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17633&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=346-5917&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-5188&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=365-797&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-4946&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-4866&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=580-495&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17341&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17195&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-3702&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17550&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17156&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17110&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=460-2860&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-14799&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17021&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=460-2327&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16836&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-30529&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=510-205&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=398-1599&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=584-476&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16083&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16477&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=855-734&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=855-990&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-14965&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=669-259&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16205&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1033-601&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=580-556&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=669-461&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17815&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=275-128&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=275-65&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=510-675&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-30453&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=398-1486&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16582&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=264-130&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=646-193&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16131&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-15852&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-29987&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=459-267&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-5108&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=510-107&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=335-735&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-30631&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=580-290&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=264-66&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=303-344&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=418-367&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16394&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=459-68&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=418-165&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-29763&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1033-553&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=669-131&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=646-97&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=855-608&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=663-67&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=418-84&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=281-57&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=398-2042&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=418-418&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=584-567&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=398-1958&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16333&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-30291&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-30199&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-3567&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=715-701&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=346-5834&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=655-556&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-15957&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=531-219&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=669-535&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1006-140&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-15907&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=715-810&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-14881&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=460-2205&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16932&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=663-159&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16658&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=281-112&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-3741&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16755&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=303-294&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=663-129&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-30075&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-16020&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=365-964&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=339-3616&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17402&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=655-640&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-29954&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=531-114&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=459-35&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=580-148&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1006-214&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=672-986&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=672-932&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=663-35&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1181-29528&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1182-29678&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=459-184&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1181-29473&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=335-1057&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=335-828&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=674-112&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=510-594&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=674-57&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=1175-17476&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=855-909&m=dev
@https://www.figma.com/design/dfELgNmLU5F1rOd0OiSJzJ/%EC%A1%B8%EC%97%85%EC%A0%84%EC%8B%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8_%ED%95%99%EC%83%9D%EC%9A%A9-X?node-id=335-1115&m=dev
`;

// URL 파싱 함수
function parseFigmaUrl(url) {
  const trimmed = url.trim().replace(/^@/, '');
  const match = trimmed.match(/figma\.com\/design\/([^\/]+).*node-id=([^&]+)/);
  if (!match) return null;
  
  const fileKey = match[1];
  const nodeId = match[2].replace(/-/g, ':');
  
  return { fileKey, nodeId, url: trimmed };
}

// URL 파싱 및 저장
const urls = figmaUrls
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && line.startsWith('@'))
  .map(parseFigmaUrl)
  .filter(Boolean);

console.log(`총 ${urls.length}개의 Figma 디자인 발견`);

// JSON 파일로 저장
const output = {
  fileKey: 'dfELgNmLU5F1rOd0OiSJzJ',
  designs: urls.map((item, index) => ({
    id: index + 1,
    nodeId: item.nodeId,
    url: item.url
  }))
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

fs.writeFileSync(
  join(projectRoot, 'figma-designs.json'),
  JSON.stringify(output, null, 2),
  'utf-8'
);

console.log(`✅ figma-designs.json 파일 생성 완료 (${urls.length}개 디자인)`);
console.log(`\n샘플 (처음 5개):`);
urls.slice(0, 5).forEach((item, i) => {
  console.log(`  ${i + 1}. node-id: ${item.nodeId}`);
});

