import React, { useEffect, useState } from 'react'
import '../css/main.css'
import axios from 'axios';
import { FaSort } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";

export default function Main() {
  const API_URL = "http://localhost:5000"

  const [certificationData, setCertificationData] = useState([]);
  const [sortConfig, setSortConfig] = useState({key: null, direction: "asc"})

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    certificationList()
    chartList()
  }, [])


  const certificationList = async () => {
    try {
      const response = await axios.get(`${API_URL}/certifications`);
      const sortedData = response.data.sort((a, b) => new Date(b.dateOfIssue) - new Date(a.dateOfIssue));
      setCertificationData(sortedData);

    } catch (error) {
      console.error("에러 발생", error)
    }
  }

  // 표 정렬 기능
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    
    const sortedData = [...certificationData].sort((a,b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
      
    })
    setCertificationData(sortedData);
    setSortConfig({key, direction})
  }
    
  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const currentYear = new Date().getFullYear();
  const startYear = 2016;
  const yearsRange = Array.from({length: currentYear - startYear + 1}, (_,i) => startYear + i);

  const chartList = async () => {
    try {
      const response = await axios.get(`${API_URL}/charts`);
      setChartData(response.data);
      
    } catch (error) {
      console.error("에러 발생", error)
    }
  }


  const categories = [...new Set(chartData.map(item => item.category))];

  const parseYear = (dateStr) => {
    const [year, month] = dateStr.split('.').map(Number);
    return year + (month ? (month - 1) / 12 : 0);
  };

  return (
    <div id='body'>
      <div id='introduce-body'>
        <div className='subtitle'>Introduce</div>
        <div id='introduce-container'>
          <div id='introduce-container-left'>
            <img src={require('../imgs/포트폴리오사진.jpg')}></img>
          </div>
          <div id='introduce-container-right'>
            <div id='introduce-container-right-title'>안녕하세요? 풀스택 개발자 백수정입니다.</div>
            <div id='introduce-container-right-text'>저는 호기심이 많은 성격으로, 흥미로운 주제를 접할 때마다 깊이 탐구하고 새로운 지식을 습득하는 것을 즐깁니다. IT 기업에서 실적 관리 업무를 맡던 중, 내부 실적 관리 프로그램의 기획자로 참여하면서 개발 분야에 대해 자연스럽게 관심을 갖게 되었습니다. 끊임없이 발전하는 기술 환경 속에서 새로운 것을 배워나가는 과정이 저에게 큰 흥미를 주었고, 저의 성향과도 잘 맞는다고 느껴 풀스택 개발자로의 전향을 결심하게 되었습니다.</div>
          </div>
        </div>
      </div>
      <div id='certification-body'>
        <div className='subtitle'>Certification</div>
        <table id='certification-table'>
          <thead>
            <tr>
              <td id='row-first'>No.</td>
              <td id='row-second' onClick={() => handleSort("certificationName")}>자격명 {getSortIcon("certificationName")}</td>
              <td id='row-third' onClick={() => handleSort("issuingOrganization")}>발행기관 {getSortIcon("issuingOrganization")}</td>
              <td id='row-four' onClick={() => handleSort("certificationNumber")}>자격증번호 {getSortIcon("certificationNumber")}</td>
              <td id='row-five' onClick={() => handleSort("dateOfIssue")}>취득년월일 {getSortIcon("dateOfIssue")}</td>
            </tr>
          </thead>
          <tbody>
            {certificationData.map((cert, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{cert.certificationName}</td>
                <td>{cert.issuingOrganization}</td>
                <td>{cert.certificationNumber}</td>
                <td>{cert.dateOfIssue}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
      <div id="chart-body">
      <div className='subtitle'>null</div>
      <svg  id='chart-container'>
        {/* X축 (연도) */}
        {yearsRange.map((year, index) => (
          <text key={year} x={100+ index * 75} y="350" textAnchor="middle" fontSize="14" style={{ fontFamily: 'lineseedkrrg' }} fill='#666666'>{year}</text>
        ))}

        {/* Y축 (카테고리) */}
        {categories.map((category, index) => (
          <text key={category} x="75" y={index * 80 + 100} textAnchor="end" fontSize="16" style={{ fontFamily: 'lineseedkrrg' }} fill='#666666'>{category}</text>
        ))}

        {/* 막대 그래프 */}
        {chartData.map((item, index) => {
          const y = categories.indexOf(item.category) * 80 + 90;
          const xStart = 100 + (parseYear(item.startDate) - startYear) * 75;
          const xEnd = 100 + (parseYear(item.endDate) - startYear) * 75;
          const width = xEnd - xStart;

          return (
            <g key={index}>
              <text x={xStart + width / 2} y={y - 35} textAnchor="middle" fontSize="14" fontWeight="bold" fill="black">{item.label}</text>
              <text x={xStart + width / 2} y={y - 20} textAnchor="middle" fontSize="12" fill="black">{item.detail}</text>
              <text x={xStart + width / 2} y={y - 5} textAnchor="middle" fontSize="12">{item.startDate} ~ {item.endDate}</text>
              <rect x={xStart} y={y} width={width} height="8" fill="#03aec5" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
      </div>
      <div id='stack-body'>
      <div className='subtitle'>Stacks</div>
        <div id='stack-container'>
          <div className='stack-box'>
            <div className='stack-box-title'>Java</div>
            <div className='stack-box-detail'>
              <ul>
                <li>웹 사이트 및 콘솔 프로그램을 개발</li>
                <li>Spring Boot를 활용하여 RESTful API를 설계하고 구현</li>
                <li>Maven과 Gradle을 사용하여 의존성 관리</li>
                <li>Spring Security를 활용하여 애플리케이션의 인증과 권한 부여 구현</li>
              </ul>
            </div>
          </div>
          <div className='stack-box'>
            <div className='stack-box-title'>Python</div>
            <div className='stack-box-detail'>
              <ul>
                <li>다양한 라이브러리와 도구를 활용하여 빅데이터 예측 및 분류</li>
              </ul>
            </div>
          </div>
          <div className='stack-box'>
            <div className='stack-box-title'>HTML/CSS/JS/TS</div>
            <div className='stack-box-detail'>
              <ul>
                <li>웹프론트엔드 프로그램을 개발</li>
                <li>목서버를 사용하여 API 호출 테스트</li>
                <li>React를 사용하여 반응형 웹 애플리케이션 개발</li>
              </ul>
            </div>
          </div>
          <div className='stack-box'>
            <div className='stack-box-title'>SQL</div>
            <div className='stack-box-detail'>
              <ul>
                <li>데이터베이스 삽입, 삭제, 갱신, 삭제</li>
                <li>데이터베이스 SQL 쿼리 작성하여 검색 및 조작</li>
              </ul>
            </div>
          </div>
          <div className='stack-box'>
            <div className='stack-box-title'>Git</div>
            <div className='stack-box-detail'>
              <ul>
                <li>프로젝트 버전 관리 및 협업 도구로 활용</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
