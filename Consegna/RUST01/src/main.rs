use std::collections::HashMap;
use::std::io;


fn sono_anagrammi(str1: &str, str2: &str) -> bool {
    if str1.chars().count()>0 && str2.chars().count()>0 {
        let mut hashMap: HashMap<char, i16> = HashMap::new();

        for i in str1.chars() {
            if str2.contains(i.to_ascii_lowercase()) || str2.contains(i.to_ascii_uppercase()) {
                hashMap.insert(i, 1);
            }else {
                hashMap.insert(i, 0);
            }
        }

        hashMap.values().all(|&x| x==1)
    }else {
        false
    }
    

}

#[cfg(test)]
mod tests{
    use super::sono_anagrammi;

    #[test]
    fn test_sonoanagrammi() {
        assert_eq!(true,sono_anagrammi("Silent", "Listen"));
        assert_eq!(false,sono_anagrammi("Simone", "Limone"));
        assert_eq!(true,sono_anagrammi("debit card", "bad credit"));
        assert_eq!(false,sono_anagrammi("Simone", "Luca"));
        assert_eq!(false,sono_anagrammi("Simone", ""));
    }
}

fn main(){}