package com.aloha.server.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 검색 옵션
 * - keyword    : 검색어
 * - code       : 옵션 코드
 *   * 0 : 제목+내용
 *   * 1 : 제목
 *   * 2 : 내용
 *   * 3 : 작성자
 */
@AllArgsConstructor
@Data
public class Option {
    private int status;
    private String keyword; // 선언만 했을 때는 null
    private int code;
    private String codeName;

    // 홍보검색기능
    private boolean eventOngoing;
    private boolean eventExpired;
    private boolean eventUpcoming;
    private boolean instagram;
    private boolean youtube;
    private boolean chzzk;
    private boolean afreeca;
    private boolean food;
    private boolean travel;
    private boolean game;
    private boolean music;
    private boolean animal;
    private boolean workOut;
    private boolean asmr;
    private boolean fashion;

    public Option() {
        this.keyword = ""; // 빈 문자열
    }

    public Option(String codeName, int code) {
        this.codeName = codeName;
        this.code = code;
    }

    public Option(int status){
        this.status = status;
    }


     // 카테고리 필드를 설정하는 메서드
     public void setCategory(String category, boolean value) {
        switch (category.toLowerCase()) {
            case "eventongoing":
                this.eventOngoing = value;
                break;
            case "eventexpired":
                this.eventExpired = value;
                break;
            case "eventupcoming":
                this.eventUpcoming = value;
                break;
            case "instagram":
                this.instagram = value;
                break;
            case "youtube":
                this.youtube = value;
                break;
            case "chzzk":
                this.chzzk = value;
                break;
            case "afreeca":
                this.afreeca = value;
                break;
            case "food":
                this.food = value;
                break;
            case "travel":
                this.travel = value;
                break;
            case "game":
                this.game = value;
                break;
            case "music":
                this.music = value;
                break;
            case "animal":
                this.animal = value;
                break;
            case "workout":
                this.workOut = value;
                break;
            case "asmr":
                this.asmr = value;
                break;
            case "fashion":
                this.fashion = value;
                break;
            default:
                throw new IllegalArgumentException("Unknown category: " + category);
        }
    }
}

